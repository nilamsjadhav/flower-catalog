const parseBodyParams = (request, bodyParamsStr) => {
  const urlSearchParams = new URLSearchParams(bodyParamsStr);
  const params = urlSearchParams.entries();
  const bodyParams = {};

  for (const [param, value] of params) {
    bodyParams[param] = value;
  }
  request.bodyParams = bodyParams;
  return false;
};

module.exports = { parseBodyParams };
