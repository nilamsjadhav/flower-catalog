const addUserDetails = ({ username, password }, users) => {
  users.unshift({ username, password });
  return users;
};

const registrationHandler = (request, response) => {
  const { body, users } = request;
  const usersRecord = addUserDetails(body, users);
  request.storeUsers(JSON.stringify(usersRecord));
  response.status(201);
  response.end(request.loginTemplate);
};

module.exports = { registrationHandler };