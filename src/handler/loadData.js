const fs = require('fs');

const storeComment = (staticSrcPath) => {
  return (comments) =>
    fs.writeFileSync(staticSrcPath, comments, 'utf8');
};

const loadData = (userViews, template, guestBookPath) => {
  const comments = JSON.parse(userViews);
  return (request, response, next) => {
    request.comments = comments;
    request.template = template;
    request.storeComment = storeComment(guestBookPath);
    next();
  };
};

module.exports = { loadData };

