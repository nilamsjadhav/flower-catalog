const { generateList } = require('./htmlLibrary.js');

const addComment = ({ name, comment }, comments) => {
  const dateTime = new Date().toLocaleString();
  comments.unshift({ dateTime, name, comment });
  return comments;
};

const showGuestBook = ({ comments, template }, response) => {
  const commentList = generateList(comments);
  const modifiedTemplate = template.replace('__HISTORY__', commentList);
  response.set('location', '/show-guest-book');
  response.set('content-type', 'text/html');
  response.end(modifiedTemplate);
};

const commentHandler = (request, response) => {
  const { body, comments } = request;
  const commentList = addComment(body, comments);
  const userViews = JSON.stringify(commentList);
  request.storeComment(userViews);
  response.status(201);
  response.end(userViews);
};

const guestBook = (request, response) => {
  if (!request.cookies) {
    response.set('content-type', 'text/html');
    response.set('location', '/signin');
    response.end(request.loginTemplate);
    return;
  }
  return showGuestBook(request, response);
};

const guestBookRouter = (request, response, next) => {
  if (request.matches('/guest-book', 'GET')) {
    return showGuestBook(request, response);
  }

  if (request.matches('/add-comment', 'POST')) {
    if (request.session) {
      commentHandler(request, response);
      return;
    }
  }
  next();
};

module.exports = { guestBookRouter, showGuestBook, guestBook, commentHandler };
