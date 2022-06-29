const fs = require('fs');

const extensions = {
  png: 'image/png',
  jpg: 'image/jpg',
  html: 'text/html',
  pdf: 'application/pdf',
  css: 'text/css',
  gif: 'image/gif'
};

const getMimeType = (file) => {
  const fileExt = file.slice(file.lastIndexOf('.') + 1);
  return extensions[fileExt] || 'text/plain';
};

const serveFileContent = (path) => (request, response) => {
  const uri = request.url.pathname;

  let fileName = path + uri;
  if (uri === '/') {
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
