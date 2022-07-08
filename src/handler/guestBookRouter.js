const fs = require('fs');
const { generateList } = require('./htmlLibrary.js');

const addComment = ({ name, comment }, comments) => {
  const dateTime = new Date().toLocaleString();
  comments.unshift({ dateTime, name, comment });
  return comments;
};

const showGuestBook = ({ comments, template }, response) => {
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.end(modifiedTemplate);
};

const commentHandler = (request, response) => {
  const { bodyParams, comments } = request;
  const commentList = addComment(bodyParams, comments);
  const userViews = JSON.stringify(commentList);
  request.storeComment(userViews);
  response.statusCode = 201;
  response.end(userViews);
};

const guestBookRouter = (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/guest-book' && request.method === 'GET') {
    return showGuestBook(request, response);
  }
  if (pathname === '/add-comment' && request.method === 'POST') {
    commentHandler(request, response);
    return;
  }
  next();
};

module.exports = { guestBookRouter, showGuestBook };
