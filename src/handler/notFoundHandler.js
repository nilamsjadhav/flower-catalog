const { toHtml } = require('./htmlLibrary.js');

const notFound = (request, response) => {
  response.statusCode = 404;
  response.write(toHtml('Not found'));
  return true;
};

module.exports = { notFound };
