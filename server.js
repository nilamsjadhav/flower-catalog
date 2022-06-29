const { guestBookHandler } = require('./src/handler/guestBookHandler.js');
const { notFound } = require('./src/handler/notFoundHandler');
const { serveFileContent } = require('./src/handler/serveFileContent.js');
const { startServer } = require('./src/server/startServer.js');

const handle = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

const handlers = [
  serveFileContent('./public'),
  guestBookHandler,
  notFound];

startServer(4443, handle(handlers), process.argv[2]);
