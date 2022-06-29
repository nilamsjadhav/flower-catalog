const http = require('http');

const startServer = (port, app) => {
  const server = http.createServer(app);
  server.listen(port, () => console.log(`server is listening on ${port}`));
};

module.exports = { startServer };
