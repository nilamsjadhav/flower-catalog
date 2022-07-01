const parseSearchParams = (request, response, next) => {
  const requestedUrl = `http://${request.headers.host}${request.url}`;
  const url = new URL(requestedUrl);
  request.url = url;

  const searchParams = url.searchParams.entries();
  const queryParams = {};

  for (const [param, value] of searchParams) {
    queryParams[param] = value;
  }
  request.queryParams = queryParams;
  next();
};

module.exports = { parseSearchParams };
