const fs = require('fs');
const { guestBookRouter } = require('./handler/guestBookRouter.js');
const { notFound } = require('./handler/notFoundHandler.js');
const { serveFileContent } = require('./handler/serveFileContent.js');
const { createRouter } = require('./router.js');
const { apiRouter } = require('./handler/apiRouter.js');
const { parseCookie } = require('./handler/parseCookie.js');
const { loginRouter } = require('./handler/loginHandler.js');
const { parseSearchParams } = require('./handler/parseSearchParams.js');
const { bodyParamsHandler } = require('./handler/parseBodyParams.js');
const { logoutHandler } = require('./handler/logoutHandler.js');
const { loadData } = require('./handler/loadData.js');

const sessions = {};

const storeUsers = (usersLogPath) => {
  return (users) =>
    fs.writeFileSync(usersLogPath, users, 'utf8');
};

const loadCredentials = (usersLogPath, loginTemplate, clients) => {
  const users = JSON.parse(clients);
  return (request, response, next) => {
    request.loginTemplate = loginTemplate;
    request.users = users;
    request.storeUsers = storeUsers(usersLogPath);
    next();
  };
};
const app = ({ staticSrcPath, guestBookPath, loginPagePath, usersLogPath, serveFrom }) => {
  const template = fs.readFileSync(staticSrcPath, 'utf8');
  const comments = fs.readFileSync(guestBookPath, 'utf8');
  const loginTemplate = fs.readFileSync(loginPagePath, 'utf8');
  const users = fs.readFileSync(usersLogPath, 'utf8');

  const loadGuestBook = loadData(comments, template, guestBookPath);
  const loadUsers = loadCredentials(usersLogPath, loginTemplate, users);
  const handlers = [
    loadGuestBook,
    loadUsers,
    parseSearchParams,
    bodyParamsHandler,
    parseCookie,
    loginRouter(sessions),
    logoutHandler(sessions),
    guestBookRouter,
    serveFileContent(serveFrom),
    apiRouter,
    notFound
  ];
  return createRouter(handlers);
};

module.exports = { app };
