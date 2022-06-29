const http = require('http');
const { parseSearchParams } = require('./parseRequest.js');

const processRequest = (request, response, handler) => {
  const requestedUrl = `http://${request.headers.host}${request.url}`;
  const url = new URL(requestedUrl);
  request.url = url;

  const queryParams = parseSearchParams(request.url);
  request.queryParams = queryParams;
  handler(request, response);
};

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    processRequest(request, response, handler);
  });

  server.listen(port, () => console.log(`server is listening on ${port}`));
};

module.exports = { startServer };
