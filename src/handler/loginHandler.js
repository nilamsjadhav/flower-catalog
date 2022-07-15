const serveLogin = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.setHeader('location', '/signin');
  response.end(request.loginTemplate);
};

const createSession = (request, sessions) => {
  const id = new Date().getTime();
  request.cookies = id;
  const username = request.body.userId;
  sessions[id] = { id, username, date: new Date().toLocaleString() };
  return id;
}

const isUserValid = ({ users, body }) => {
  const { userId, pass } = body;
  return users.some(({ username, password }) =>
    username === userId && password === pass);
};

const setCookies = (request, response, sessions) => {
  const id = createSession(request, sessions);
  response.status(201);
  response.cookie('id', id);
  response.end();
};

const authenticateUser = sessions => (request, response) => {
  if (!isUserValid(request, response)) {
    response.statusCode = 401;
    response.end();
    return;
  }
  return setCookies(request, response, sessions);
};

module.exports = { authenticateUser, serveLogin };
