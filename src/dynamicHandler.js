const fs = require('fs');

const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send(toHtml('Not found'));
  return true;
};

const formatContent = (content) => content.replace('+', ' ');

const storeComments = ({ name, comment }) => {
  const content = fs.readFileSync('./public/data/comment.json', 'utf8');
  const dateTime = new Date().toLocaleString();
  const comments = JSON.parse(content);
  comments.unshift({ dateTime, name, comment: formatContent(comment) });
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
