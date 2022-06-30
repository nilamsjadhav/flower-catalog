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
  response.setHeader('content-type', 'text/html');
  response.write(modifiedTemplate);
  return true;
};

const commentHandler = (request, response) => {
  const { queryParams, comments } = request;
  const commentList = addComment(queryParams, comments);
  request.storeComment(JSON.stringify(commentList));
  return showGuestBook(request, response);
};

const guestBookRouter = (request, response) => {
  const pathname = request.url.pathname;

  if (pathname === '/guest-book' && request.method === 'GET') {
    return showGuestBook(request, response);
  }
  if (pathname === '/add-comment' && request.method === 'GET') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { guestBookRouter, showGuestBook };
