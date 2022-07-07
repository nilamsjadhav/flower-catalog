const fs = require('fs');
const { guestBookRouter } = require('./handler/guestBookRouter.js');
const { notFound } = require('./handler/notFoundHandler.js');
const { serveFileContent } = require('./handler/serveFileContent.js');
const { parseSearchParams } = require('./handler/parseSearchParams.js');
const { createRouter } = require('./router.js');
const { apiRouter } = require('./handler/apiRouter.js');
const { parseCookie } = require('./handler/parseCookie.js');
const { loginRouter } = require('./handler/loginHandler.js');
const { bodyParamsHandler } = require('./handler/parseBodyParams.js');

const sessions = {};

const storeComment = (staticSrcPath) => {
  return (comments) =>
    fs.writeFileSync(staticSrcPath, comments, 'utf8');
};

const loadData = (userViews, template, loginTemplate, guestBookPath) => {
  const comments = JSON.parse(userViews);
  return (request, response, next) => {
    request.loginTemplate = loginTemplate;
    request.comments = comments;
    request.template = template;
    request.storeComment = storeComment(guestBookPath);
    next();
  };
};

const app = ({ staticSrcPath, guestBookPath, loginPagePath, serveFrom }) => {
  const template = fs.readFileSync(staticSrcPath, 'utf8');
  const comments = fs.readFileSync(guestBookPath, 'utf8');
  const loginPage = fs.readFileSync(loginPagePath, 'utf8');

  const loadGuestBook = loadData(comments, template, loginPage, guestBookPath);
  const handlers = [
    loadGuestBook,
    parseSearchParams,
    bodyParamsHandler,
    parseCookie,
    loginRouter(sessions),
    guestBookRouter,
    serveFileContent(serveFrom),
    apiRouter,
    notFound
  ];
  return createRouter(handlers);
};

module.exports = { app };
