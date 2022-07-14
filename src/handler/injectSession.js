const injectSession = (sessions) => (request, response, next) => {
  if (!request.cookies) {
    next();
    return;
  }
  const id = request.cookies.id;
  request.session = sessions[id];
  next();
};

module.exports = { injectSession };