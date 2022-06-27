const fs = require('fs');

const extensions = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getMimeType = (file) => {
  const fileExt = file.slice(file.lastIndexOf('.') + 1);
  return extensions[fileExt] || 'text/plain';
};

const serveFileContent = ({ uri }, response, path) => {
  let fileName = path + uri;

  if (uri === '/') {
    fileName = `${path}/flower-catalog.html`;
  }

  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeader('content-type', getMimeType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
