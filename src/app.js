const { guestBookHandler } = require('./handler/guestBookHandler.js');
const { notFound } = require('./handler/notFoundHandler');
const { serveFileContent } = require('./handler/serveFileContent.js');
const { parseSearchParams } = require('./handler/parseRequest.js');
const { handle } = require('./router.js');
const { apiHandler } = require('./handler/apiHandler.js');
const fs = require('fs');

const storeComment = (staticSrcPath) => {
  return (comments) =>
    fs.writeFileSync(staticSrcPath, comments, 'utf8');
};

const loadData = (userViews, template, guestBookPath) => {
  const comments = JSON.parse(userViews);
  return (request, response) => {
    request.comments = comments;
    request.template = template;
    request.storeComment = storeComment(guestBookPath);
  };
};

const app = ({ staticSrcPath, guestBookPath, serveFrom }) => {
  const template = fs.readFileSync(staticSrcPath, 'utf8');
  const comments = fs.readFileSync(guestBookPath, 'utf8');

  const loadGuestBook = loadData(comments, template, guestBookPath);
  const handlers = [
    loadGuestBook,
    parseSearchParams,
    guestBookHandler,
    apiHandler,
    serveFileContent(serveFrom),
    notFound
  ];
  return handle(handlers);
};

module.exports = { app };
