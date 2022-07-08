const logoutHandler = sessions => (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/logout') {
    const { id } = request.cookies;
    delete sessions[id];
    response.statusCode = 302;
    response.setHeader('set-cookie', `id=${id};Max-Age=0`);
    response.setHeader('location', '/');
    response.end('');
    return;
  }
  next();
};
exports.logoutHandler = logoutHandler;
