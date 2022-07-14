const parseCookie = (request, response, next) => {
  const cookieString = request.headers.cookie;

  if (!cookieString) {
    next();
    return;
  }
  const cookies = {};
  const cookiesList = cookieString.split(';');
  cookiesList.forEach(element => {
    const [field, value] = element.split('=');
    cookies[field] = value;
  });

  request.cookies = cookies;
  next();
};

module.exports = { parseCookie };
