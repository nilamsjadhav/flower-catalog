const { app } = require('./src/app.js');
// const { app } = require('./src/xhrApp.js');
const { startServer } = require('./src/server/startServer.js');

const appConfig = {
  guestBookPath: './data/comment.json',
  staticSrcPath: './resource/template.html',
  loginPagePath: './public/login.html',
  usersLogPath: './data/users.json',
  serveFrom: './public'
};

startServer(4443, app(appConfig));
