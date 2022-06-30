const fs = require('fs');
const mimeType = require('mime-types');

const getMimeType = (file) => {
  return mimeType.lookup(file) || 'text/plain';
};

const serveFileContent = (path) => (request, response) => {
  const pathname = request.url.pathname;

  let fileName = path + pathname;
  if (pathname === '/') {
    fileName = path + '/flower-catalog.html';
  }

  if (!fs.existsSync(fileName)) {
    return false;
  }
  response.setHeader('content-type', getMimeType(fileName));
  const content = fs.readFileSync(fileName);
  response.end(content);
  return true;
};

module.exports = { serveFileContent };
