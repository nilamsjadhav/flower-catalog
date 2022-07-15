const express = require('express');
const { loadJSON, loadText, storeJSON } = require('./dataStore.js');
const { generateList } = require('./htmlLibrary.js');

const applyTemplate = (templateText, dictionary) => {
  let result = templateText;
  for (const key in dictionary) {
    result = result.replace(key, dictionary[key])
  }
  return result;
}

const ensureLoggedIn = (req, res, next) => {
  if (!req.session) {
    res.status(302);
    return res.redirect('/login.html');
  }
  next();
};

const getComments = ({ comments }, res) => {
  res.set('content-type', 'application/json');
  res.end(JSON.stringify(comments));
};

const addComment = (req, res, next) => {
  const { body: { username: name, comment }, comments } = req;
  const dateTime = new Date().toLocaleString();
  comments.unshift({ name, comment, dateTime });
  next();
}

const createGuestBookRouter = (filePath, templatePath) => {
  const comments = loadJSON(filePath);
  const guestBookTemplate = loadText(templatePath);

  const injectComments = (req, res, next) => {
    req.comments = comments;
    next();
  }

  const storeComments = (req, res) => {
    storeJSON(filePath, req.comments);
    res.status(201);
    res.end();
  }

  const showGuestBook = (req, res) => {
    const commentList = generateList(req.comments);
    const dictionary = { '__HISTORY__': commentList };
    const html = applyTemplate(guestBookTemplate, dictionary);
    res.set('content-type', 'text/html')
    res.end(html);
  }

  const router = express.Router();
  router.use(ensureLoggedIn, injectComments);
  router.post('/add-comment', addComment, storeComments);
  router.get('/show-guest-book', showGuestBook);
  router.get('/api/comments', getComments);
  return router;
}

module.exports = { createGuestBookRouter };
