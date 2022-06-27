const EOL = '\r\n';

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  setHeader(header, value) {
    this.#headers[header] = value;
  }

  #writeHeaders() {
    const fields = Object.entries(this.#headers);

    fields.forEach(([header, value]) =>
      this.#socket.write(`${header}:${value}${EOL}`));
  }

  send(content) {
    const responseLine = `HTTP/1.1 ${this.#statusCode}${EOL}`;
    this.#socket.write(responseLine);

    this.#writeHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
