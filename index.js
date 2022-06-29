const { app } = require('./src/app.js');
const { startServer } = require('./src/server/startServer.js');

const appConfig = {
  guestBookPath: './data/comment.json',
  staticSrcPath: './resource/template.html',
  serveFrom: './public'
};

startServer(4443, app(appConfig));
