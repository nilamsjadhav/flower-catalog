const fs = require('fs');

const getFilename = (responseHeaders) => {
  return responseHeaders['Content-Disposition'].subHeaders.filename;
};

const parseSubHeaders = (rawValue) => {
  const subHeaders = {};
  const [value, ...rawSubHeaders] = rawValue.split(';');

  rawSubHeaders.reduce((subHeaders, rawSubHeader) => {
    const [key, value] = rawSubHeader.split('=');
    const field = key.trim()
    subHeaders[field] = value.replaceAll('"', '');
    return subHeaders;
  }, subHeaders);

  return { value: value.trim(), subHeaders }
};

const parseHeaders = (paramStr) => {
  const rawHeaders = paramStr.split('\r\n');

  return rawHeaders.reduce((headerList, header) => {
    const [field, value] = header.split(':');
    headerList[field] = parseSubHeaders(value);
    return headerList;
  }, {});
};

const uploadFile = (buffer) => {
  const CRLFBuffer = Buffer.from('\r\n\r\n');
  const CRLFIndex = buffer.indexOf(CRLFBuffer);

  const rawHeaders = buffer.slice(0, CRLFIndex);
  const content = buffer.slice(CRLFIndex + CRLFBuffer.length, buffer.length - 6);
  const responseHeaders = parseHeaders(rawHeaders.toString().trim());
  const filename = getFilename(responseHeaders);
  fs.writeFileSync('./uploadedFiles/' + filename, content);
};

const getBoundary = (request) => {
  const contentType = request.headers['content-type'];
  return '--' + contentType.split('=')[1];
};

const removeBoundaries = (buffer, pattern) => {
  let index = 0;
  const content = [];

  while (buffer.length > index) {
    const currentPart = buffer.slice(index, index + pattern.length);
    if (pattern.equals(currentPart)) {
      index += pattern.length;
    }
    content.push(buffer[index]);
    index++;
  }
  return Buffer.from(content);
};

const parseFileContent = (request, response, next) => {
  let data = [];
  const pathname = request.url.pathname;
  if (pathname === '/upload-file' && request.method === 'POST') {
    request.on('data', (chunk) => {
      data = data.concat(chunk);
    });

    request.on('end', () => {
      const boundaryBuffer = Buffer.from(getBoundary(request));
      const buffer = removeBoundaries(...data, boundaryBuffer);
      uploadFile(buffer);
      response.end('File uploaded successfully');
    });
    return;
  }
  next();
};

module.exports = { parseFileContent };

