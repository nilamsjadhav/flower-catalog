const { guestBookRouter } = require('./handler/guestBookRouter.js');
const { notFound } = require('./handler/notFoundHandler.js');
const { serveFileContent } = require('./handler/serveFileContent.js');
const { parseSearchParams } = require('./handler/parseSearchParams.js');
const { createRouter } = require('./router.js');
const { apiRouter } = require('./handler/apiRouter.js');
const fs = require('fs');

const storeComment = (staticSrcPath) => {
  return (comments) =>
    fs.writeFileSync(staticSrcPath, comments, 'utf8');
};

const loadData = (userViews, template, guestBookPath) => {
  const comments = JSON.parse(userViews);
  return (request, response, next) => {
    const pathname = request.url.pathname;
    request.comments = comments;
    request.template = template;
    request.storeComment = storeComment(guestBookPath);
    next(request, request);
  };
};

const app = ({ staticSrcPath, guestBookPath, serveFrom }) => {
  const template = fs.readFileSync(staticSrcPath, 'utf8');
  const comments = fs.readFileSync(guestBookPath, 'utf8');

  const loadGuestBook = loadData(comments, template, guestBookPath);
  const handlers = [
    loadGuestBook,
    parseSearchParams,
    guestBookRouter,
    apiRouter,
    serveFileContent(serveFrom),
    notFound
  ];
  return createRouter(handlers);
};

module.exports = { app };
