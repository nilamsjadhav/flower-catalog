const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const processRequest = (socket, handle, path) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    console.log(request);
    console.log(new Date(), request.method, request.uri);

    const response = new Response(socket);
    handle(request, response, path);
  });
};

const startServer = (port, handle, path = './public') => {
  const server = createServer(socket =>
    processRequest(socket, handle, path));

  server.listen(port, () => console.log(`server is listening on ${port}`));
};

module.exports = { startServer, processRequest };

