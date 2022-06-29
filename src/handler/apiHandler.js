const showGuestBook = ({ comments }, response) => {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(comments));
  return true;
};

const apiHandler = (request, response) => {
  const pathname = request.url.pathname;

  if (pathname === '/api/guest-book') {
    return showGuestBook(request, response);
  }
  return false;
};

module.exports = { apiHandler };
