const fs = require('fs');
const { createApp } = require('./src/app.js');

const appConfig = {
  guestBookPath: './data/comment.json',
  guestBookTemplatePath: './resource/template.html',
  loginPagePath: './resource/login.html',
  databasePath: './data/users.json',
};

const app = createApp(appConfig, {}, fs.readFileSync);
app.listen(4443, () => console.log('server is listening on 4443'));