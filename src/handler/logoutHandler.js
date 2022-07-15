const logoutHandler = sessions => (request, response) => {
  const { id } = request.cookies;
  delete sessions[id];
  response.clearCookie('id');
  response.redirect('/');
};
exports.logoutHandler = logoutHandler;
