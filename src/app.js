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
const { loadLoginData, loadCommentData } = require('./handler/loadData.js');
const { registrationHandler } = require('./handler/registrationHandler.js');
const { parseFileContent } = require('./handler/multipartFormDataHandler.js');
const { injectSession } = require('./handler/injectSession.js');

const createApp = (appConfig, sessions, readFile, writeFile) => {
  const { staticSrcPath, guestBookPath,
    loginPagePath, serveFrom, databasePath } = appConfig;

  const template = readFile(staticSrcPath, 'utf8');
  const comments = readFile(guestBookPath, 'utf8');
  const loginTemplate = readFile(loginPagePath, 'utf8');
  const users = readFile(databasePath, 'utf8');

  const loadGuestBook = loadCommentData(comments, template, guestBookPath, writeFile);
  const loadUsers = loadLoginData(loginTemplate, users, databasePath, writeFile);
  const handlers = [
    parseSearchParams,
    loadGuestBook,
    loadUsers,
    bodyParamsHandler,
    parseCookie,
    injectSession(sessions),
    loginRouter(sessions),
    logoutHandler(sessions),
    registrationHandler,
    parseFileContent,
    guestBookRouter(sessions),
    serveFileContent(serveFrom),
    apiRouter,
    notFound
  ];
  return createRouter(handlers);
};

const app = (appConfig, sessions, readFile, writeFile) => params;

module.exports = { createApp };
