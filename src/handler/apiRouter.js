const showCommentLog = ({ comments }, response) => {
  response.setHeader('content-type', 'application/json');
  response.setHeader('location', '/api/guest-book');
  response.end(JSON.stringify(comments));
};

const apiRouter = (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/api/guest-book' && request.method === 'GET') {
    return showCommentLog(request, response);
  }
  next();
};

module.exports = { apiRouter };
