const createNext = handlers => {
  let index = -1;
  const callNextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNextHandler(req, res));
    }
  };
  return callNextHandler;
};

const matches = function (path, method) {
  return path === this.url.pathname && method === this.method;
}
const createRouter = (handlers) => {
  return (req, res) => {
    req.matches = matches.bind(req);
    const next = createNext(handlers);
    next(req, res);
  };
};

module.exports = { createRouter };
