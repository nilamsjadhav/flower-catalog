const fs = require('fs');

const extension = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  html: 'text/html'
};

const getMimeType = (file) => {
  const fileExt = file.slice(file.lastIndexOf('.') + 1);
  return extension[fileExt] || 'text/plain';
};

const serveFileContent = ({ uri }, response, path) => {
  const fileName = path + uri;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeader('content-type', getMimeType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
