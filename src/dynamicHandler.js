const toHtml = (content) => `<html><body><h2>${content}</h2><body><html>`;

const notFound = (request, response) => {
  response.statusCode = 404;
  response.send(toHtml('Not found'));
  return true;
};

module.exports = { toHtml, notFound };
