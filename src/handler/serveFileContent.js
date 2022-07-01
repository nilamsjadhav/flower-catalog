const fs = require('fs');
const mimeType = require('mime-types');

const getMimeType = (file) => {
  return mimeType.lookup(file) || 'text/plain';
};

const serveFileContent = (path) => (request, response, next) => {
  const pathname = request.url.pathname;
  let fileName = path + pathname;

  if (pathname === '/') {
    fileName = path + '/flower-catalog.html';
  }

  if (!fs.existsSync(fileName)) {
    next();
    return;
  }
  response.setHeader('content-type', getMimeType(fileName));
  const content = fs.readFileSync(fileName);
  response.end(content);
};

module.exports = { serveFileContent };
