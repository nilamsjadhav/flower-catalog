const storeData = (path, writeFile) => {
  return (content) =>
    writeFile(path, content, 'utf8');
};

const loadCommentData = (userViews, template, guestBookPath, writeFile) => {
  const comments = JSON.parse(userViews);
  return (request, response, next) => {
    request.comments = comments;
    request.template = template;
    request.storeComment = storeData(guestBookPath, writeFile);
    next();
  };
};

const loadLoginData = (loginTemplate, endUsers, databasePath, writeFile) => {
  const users = JSON.parse(endUsers)
  return (request, response, next) => {
    request.loginTemplate = loginTemplate;
    request.users = users;
    request.storeUsers = storeData(databasePath, writeFile);
    next();
  };
};


module.exports = { loadLoginData, loadCommentData };

