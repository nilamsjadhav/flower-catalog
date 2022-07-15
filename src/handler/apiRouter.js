const getComments = ({ comments }, response) => {
  response.set('content-type', 'application/json');
  response.set('location', '/api/guest-book');
  response.end(JSON.stringify(comments));
};

module.exports = { getComments };
