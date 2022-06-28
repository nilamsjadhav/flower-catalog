const { guestBookHandler } = require('./src/guestBookHandler.js');
const { notFound } = require('./src/notFoundHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { startServer } = require('./src/startServer.js');

const handle = (handlers) => {
  return (request, response, path) => {
    return handlers.some(handler => handler(request, response, path));
  };
};

const handlers = [
  serveFileContent,
  guestBookHandler,
  notFound];

startServer(4443, handle(handlers), process.argv[2]);
