const createSession = (request, sessions) => {
  const id = new Date();
  request.cookies = id;
  const username = request.bodyParams.username;
  sessions[id] = { id, username, date: new Date().toLocaleString() };
  return id;
}

const isUserValid = ({ users, bodyParams }) => {
  const { userId, pass } = bodyParams;
  return users.some(({ username, password }) =>
    username === userId && password === pass);
};

const loginHandler = (request, response, sessions) => {
  const id = createSession(request, sessions);
  response.statusCode = 201;
  response.setHeader('set-cookie', `id=${id}`);
  response.end();
};

const serveLogin = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.setHeader('location', '/signin');
  response.end(request.loginTemplate);
};

const loginRouter = sessions => (request, response, next) => {
  if (request.matches('/guest-book', 'GET') && !request.session) {
    return serveLogin(request, response);
  }

  if (request.matches('/login', 'POST')) {
    if (!isUserValid(request, response)) {
      response.statusCode = 401;
      response.end();
      return;
    }
    return loginHandler(request, response, sessions);
  }

  next();
};

module.exports = { loginRouter };
