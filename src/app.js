const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { createGuestBookRouter } = require('./handler/guestBookRouter.js');
const { createAuthRouter } = require('./handler/authRouter.js');

const createApp = (appConfig, sessions) => {
  const { guestBookPath, guestBookTemplatePath, databasePath } = appConfig;

  const authRouter = createAuthRouter(databasePath, sessions);
  const guestBookRouter = createGuestBookRouter(guestBookPath, guestBookTemplatePath);

  const app = express();
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(authRouter);
  app.use('/guest-book', guestBookRouter);

  return app;
};

module.exports = { createApp };