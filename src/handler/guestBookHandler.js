const fs = require('fs');
const { generateList } = require('./library.js');

const addComment = ({ name, comment }, comments) => {
  const dateTime = new Date().toLocaleString();
  comments.unshift({ dateTime, name, comment });
  console.log(comments);
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

const guestBookHandler = (request, response) => {
  const pathname = request.url.pathname;
  if (pathname === '/guest-book') {
    return showGuestBook(request, response);
  }
  if (pathname === '/add-comment') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { guestBookHandler, displayGuestBook: showGuestBook };
