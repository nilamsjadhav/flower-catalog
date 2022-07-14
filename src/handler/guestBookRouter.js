const { generateList } = require('./htmlLibrary.js');

const addComment = ({ name, comment }, comments) => {
  const dateTime = new Date().toLocaleString();
  comments.unshift({ dateTime, name, comment });
  return comments;
};

const showGuestBook = ({ comments, template }, response) => {
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.setHeader('location', '/guest-book');
  response.setHeader('content-type', 'text/html');
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

const guestBookRouter = (sessions) => (request, response, next) => {
  const pathname = request.url.pathname;
  if (pathname === '/guest-book' && request.method === 'GET') {
    return showGuestBook(request, response);
  }
  if (pathname === '/add-comment' && request.method === 'POST') {
    if (request.session) {
      commentHandler(request, response);
      return;
    }
  }
  next();
};

module.exports = { guestBookRouter, showGuestBook };
