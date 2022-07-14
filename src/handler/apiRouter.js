const showCommentLog = ({ comments }, response) => {
  response.setHeader('content-type', 'application/json');
  response.setHeader('location', '/api/guest-book');
  response.end(JSON.stringify(comments));
};

const apiRouter = (request, response, next) => {
  if (request.matches('/api/guest-book', 'GET')) {
    return showCommentLog(request, response);
  }
  next();
};

module.exports = { apiRouter };
