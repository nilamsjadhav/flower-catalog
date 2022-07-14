const addUserDetails = ({ username, password }, users) => {
  users.unshift({ username, password });
  return users;
};

const registrationHandler = (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname !== '/register' && request.method !== "POST") {
    next();
    return;
  }
  const { bodyParams, users } = request;
  const usersRecord = addUserDetails(bodyParams, users);
  request.storeUsers(JSON.stringify(usersRecord));
  response.statusCode = 201;
  response.end(request.loginTemplate);
  return;
};

module.exports = { registrationHandler };