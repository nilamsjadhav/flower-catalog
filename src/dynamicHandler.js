const fs = require('fs');

const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send(toHtml('Not found'));
  return true;
};

const formatContent = (content) => content.replaceAll('+', ' ');

const structureComment = ({ name, comment }, content) => {
  const dateTime = new Date().toLocaleString();
  const comments = JSON.parse(content);
  comments.unshift({ dateTime, name, comment: formatContent(comment) });
  return comments;
};

const storeComments = (queryParams) => {
  const content = fs.readFileSync('./public/data/comment.json', 'utf8');
  const comments = structureComment(queryParams, content);
  fs.writeFileSync('./public/data/comment.json', JSON.stringify(comments));
};

const dynamicHandler = (request) => {
  const { uri, queryParams } = request

  if (uri === '/comment') {
    storeComments(queryParams)
    return true;
  }
  return false;
};
module.exports = { dynamicHandler, toHtml, notFound };
