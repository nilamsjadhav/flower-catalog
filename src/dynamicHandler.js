const fs = require('fs');

const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const generateList = (comments) => {
  return comments.map(({ dateTime, name, comment }) => {
    return `<li>${dateTime} ${name} ${comment}</li>`;
  }).join('');
};

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send(toHtml('Not found'));
  return true;
};

const formatContent = (content) => content.replaceAll('+', ' ');

const structureComment = ({ name, comment }, content) => {
  const dateTime = new Date().toLocaleString();
  const comments = JSON.parse(content);
  comments.unshift({
    dateTime,
    name: formatContent(name),
    comment: formatContent(comment)
  });
  return comments;
};

const displayGuestBook = (comments, template, response) => {
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.setHeader('content-type', 'text/html');
  response.send(modifiedTemplate);
};

const commentHandler = ({ queryParams }, response) => {
  const content = fs.readFileSync('./public/data/comment.json', 'utf8');
  let comments = JSON.parse(content);

  if (queryParams) {
    comments = structureComment(queryParams, content);
    fs.writeFileSync('./public/data/comment.json', JSON.stringify(comments));
  }

  const template = fs.readFileSync('./public/data/template.html', 'utf8');
  displayGuestBook(comments, template, response);
  return true;
};

const dynamicHandler = (request, response) => {
  const { uri } = request;

  if (uri === '/guest-book') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler, toHtml, notFound, displayGuestBook };
