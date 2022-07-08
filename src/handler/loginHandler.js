const loginHandler = (response, id) => {
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.setHeader('set-cookie', `id=${id}`);
  response.end();
};

const addUserDetails = ({ username, password }, users) => {
  const dateTime = new Date().toLocaleString();
  users.unshift({ username, password });
  return users;
};

const registrationHandler = (request, response) => {
  const { bodyParams, users } = request;
  const commentList = addUserDetails(bodyParams, users);
  request.storeUsers(JSON.stringify(commentList));
  return;
};

const loginRouter = (sessions) => (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/guest-book' && !request.cookies) {
    response.end(request.loginTemplate);
    return;
  }

  if (pathname === '/login' && request.method === 'POST') {
    const id = Math.floor(Math.random() * 100);
    const username = request.bodyParams.username;
    sessions[id] = { id, username, date: new Date().toLocaleString() };
    loginHandler(response, id);
    return;
  }

  if (pathname === '/register') {
    response.end(request.loginTemplate);
    return;
  }
  next();
};

module.exports = { loginRouter };
