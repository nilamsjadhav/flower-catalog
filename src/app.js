const express = require('express');
const { guestBook, showGuestBook, commentHandler } = require('./handler/guestBookRouter.js');
const { notFound } = require('./handler/notFoundHandler.js');
const { getComments } = require('./handler/apiRouter.js');
const { parseCookie } = require('./handler/parseCookie.js');
const { authenticateUser, serveLogin } = require('./handler/loginHandler.js');
const { logoutHandler } = require('./handler/logoutHandler.js');
const { loadLoginData, loadCommentData } = require('./handler/loadData.js');
const { registrationHandler } = require('./handler/registrationHandler.js');
const { parseFileContent } = require('./handler/multipartFormDataHandler.js');
const { injectSession } = require('./handler/injectSession.js');

const createApp = (appConfig, sessions, readFile, writeFile) => {
  const { staticSrcPath, guestBookPath,
    loginPagePath, databasePath } = appConfig;

  const template = readFile(staticSrcPath, 'utf8');
  const comments = readFile(guestBookPath, 'utf8');
  const loginTemplate = readFile(loginPagePath, 'utf8');
  const users = readFile(databasePath, 'utf8');

  const loadGuestBook = loadCommentData(comments, template, guestBookPath, writeFile);
  const loadUsers = loadLoginData(loginTemplate, users, databasePath, writeFile);

  const app = express();

  app.use(express.static('public'));
  app.use(loadGuestBook);
  app.use(loadUsers);
  app.use(parseCookie);
  app.use(injectSession(sessions));
  app.get('/guest-book', guestBook);
  app.get('/show-guest-book', showGuestBook);
  app.get('/api/guest-book', getComments);
  app.use(express.urlencoded({ extended: true }));
  app.post('/login', authenticateUser(sessions));
  app.get('/logout', logoutHandler(sessions));
  app.post('/add-comment', (req, res) => {
    if (req.session) {
      commentHandler(req, res);
      return;
    }
  })
  app.post('/register', registrationHandler)
  return app;
};

module.exports = { createApp };