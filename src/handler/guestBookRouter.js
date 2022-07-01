const fs = require('fs');
const { generateList } = require('./htmlLibrary.js');
const { parseBodyParams } = require('./parseBodyParams.js');

const addComment = ({ name, comment }, comments) => {
  const dateTime = new Date().toLocaleString();
  comments.unshift({ dateTime, name, comment });
  return comments;
};

const showGuestBook = ({ comments, template }, response) => {
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.write(modifiedTemplate);
  return true;
};

const commentHandler = (request, response) => {
  const { bodyParams, comments } = request;
  const commentList = addComment(bodyParams, comments);
  request.storeComment(JSON.stringify(commentList));
  return showGuestBook(request, response);
};

const guestBookRouter = (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/guest-book' && request.method === 'GET') {
    return showGuestBook(request, response);
  }
  if (pathname === '/add-comment' && request.method === 'POST') {
    let userViews = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      userViews += chunk;
    });
    request.on('end', () => {
      parseBodyParams(request, userViews);
      commentHandler(request, response);
    });
    return;
  }
  next(request, response);
};

module.exports = { guestBookRouter, showGuestBook };
