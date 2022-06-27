const { toHtml } = require('./library.js');

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send(toHtml('Not found'));
  return true;
};

module.exports = { toHtml, notFound };
