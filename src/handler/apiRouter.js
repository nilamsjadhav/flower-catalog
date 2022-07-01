const showCommentLog = ({ comments }, response) => {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(comments));
  return true;
};

const apiRouter = (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/api/guest-book') {
    return showCommentLog(request, response);
  }
  next(request, response);
};

module.exports = { apiRouter };