const fs = require('fs');
const { createApp } = require('./src/app.js');

const appConfig = {
  guestBookPath: './data/comment.json',
  staticSrcPath: './resource/template.html',
  loginPagePath: './public/login.html',
  databasePath: './data/users.json',
};

const app = createApp(appConfig, {}, fs.readFileSync, fs.writeFileSync);
app.listen(4443);