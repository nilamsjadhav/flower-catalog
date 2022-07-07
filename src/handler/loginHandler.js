const loginHandler = (response, id) => {
  response.statusCode = 302;
  response.setHeader('Location', '/');
  response.setHeader('set-cookie', `id=${id}`);
  response.end();
};

const loginRouter = (sessions) => (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/' && !request.cookies) {
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
  next();
};

module.exports = { loginRouter };
