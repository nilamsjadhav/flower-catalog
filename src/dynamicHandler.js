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
  comments.unshift({
    dateTime,
    name: formatContent(name),
    comment: formatContent(comment)
  });
  return comments;
};

const storeComments = (queryParams) => {
  const content = fs.readFileSync('./public/data/comment.json', 'utf8');
  const comments = structureComment(queryParams, content);
  fs.writeFileSync('./public/data/comment.json', JSON.stringify(comments));
  return comments;
};

const generateList = (comments) => {
  return comments.map(({ dateTime, name, comment }) => {
    return `<li>${dateTime} ${name} ${comment}</li>`;
  }).join('');
};

const addComments = (comments, response) => {
  const template = fs.readFileSync('./public/data/template.html', 'utf8');
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.send(modifiedTemplate);
};

const dynamicHandler = (request, response) => {
  const { uri, queryParams } = request

  if (uri === '/comment') {
    const comments = storeComments(queryParams);
    addComments(comments, response);
    return true;
  }
  return false;
};
module.exports = { dynamicHandler, toHtml, notFound };
