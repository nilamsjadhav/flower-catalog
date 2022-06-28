const formatContent = (content) =>
  content.replaceAll('+', ' ').replaceAll('\r\n', '%0D%0A');

const parseContent = ({ name, comment }) => {
  return {
    name: formatContent(name),
    comment: formatContent(comment)
  };
};

const parseParams = (params) => {
  const queryParams = {};
  const paramString = params.split('&');

  paramString.forEach(parameter => {
    const [param, value] = parameter.split('=');
    queryParams[param] = value;
  });
  return parseContent(queryParams);
};

const parseUri = (rawUri) => {
  const [uri, params] = rawUri.split('?');

  if (params) {
    const queryParams = parseParams(params);
    return { uri, queryParams };
  }
  return { uri };
};

const parseRequestLine = (line) => {
  const [method, rawUri, version] = line.split(' ');
  const httpVersion = version.trim();
  const uri = parseUri(rawUri);
  return { method, ...uri, httpVersion };
};

const splitHeader = (line) => {
  const index = line.indexOf(':');
  const header = line.slice(0, index).toLowerCase();
  const value = line.slice(index + 1).trim();
  return [header, value];
};

const parseHeaders = (lines) => {
  let index = 0;
  const headers = {};

  while (lines.length > index && lines[index].length > 1) {
    const [header, value] = splitHeader(lines[index]);
    headers[header] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseHeaders, parseRequest, parseRequestLine, splitHeader };
