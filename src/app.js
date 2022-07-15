const express = require('express');
const { createGuestBookRouter } = require('./handler/guestBookRouter.js');
const { createAuthRouter } = require('./handler/authRouter.js');
const { parseCookie } = require('./handler/parseCookie.js');

const logRequest = ({ method, url }, res, next) => {
  console.log(method, url);
  next();
};

const createApp = (appConfig, sessions) => {
  const { guestBookPath, guestBookTemplatePath, databasePath } = appConfig;
  const authRouter = createAuthRouter(databasePath, sessions);
  const guestBookRouter = createGuestBookRouter(guestBookPath, guestBookTemplatePath);

  const app = express();
  app.use(logRequest);
  app.use(express.static('public'));
  app.use(parseCookie);
  app.use(express.urlencoded({ extended: true }));
  app.use(authRouter);
  app.use('/guest-book', guestBookRouter);

  return app;
};

module.exports = { createApp };