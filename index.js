const fs = require('fs');
const { createApp } = require('./src/app.js');
const { startServer } = require('./src/server/startServer.js');

const appConfig = {
  guestBookPath: './data/comment.json',
  staticSrcPath: './resource/template.html',
  loginPagePath: './public/login.html',
  databasePath: './data/users.json',
  serveFrom: './public'
};

startServer(4443, createApp(appConfig, {}, fs.readFileSync, fs.writeFileSync));
