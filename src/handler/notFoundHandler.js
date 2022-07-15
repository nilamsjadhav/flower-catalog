const { toHtml } = require('./htmlLibrary.js');

const notFound = (request, response) => {
  response.statusCode = 404;
  response.set('content-type', 'text/html');
  response.end(toHtml('Not found'));
};

module.exports = { notFound };
