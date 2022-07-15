const fs = require('fs');
const mimeType = require('mime-types');

const getMimeType = (file) => {
  return mimeType.lookup(file) || 'text/plain';
};

const serveFileContent = (request, response, next) => {
  // const pathname = request.url.pathname;
  // let fileName = path + pathname;

  // if (request.matches('/', 'GET')) {
  //   fileName = path + 'index.html';
  // }

  if (!fs.existsSync(pathname)) {
    next();
    return;
  }
  // response.setHeader('content-type', getMimeType(pathname));
  // response.setHeader('location', pathname);
  const content = fs.readFileSync(fileName);
  response.end(content);
};

module.exports = { serveFileContent };
