const parseBodyParams = (request, bodyParamsStr) => {
  const urlSearchParams = new URLSearchParams(bodyParamsStr);
  const params = urlSearchParams.entries();
  const bodyParams = {};
  for (const [param, value] of params) {
    bodyParams[param] = value;
  }
  request.bodyParams = bodyParams;
  return;
};

const bodyParamsHandler = (request, response, next) => {
  request.setEncoding('utf8');
  let userViews = '';
  request.on('data', (chunk) => {
    userViews += chunk;
  });
  request.on('end', () => {
    parseBodyParams(request, userViews);
    next();
  });
};
module.exports = { bodyParamsHandler };
