const express = require('express');
const { loadJSON, storeJSON } = require("./dataStore");

const createSession = (userId, id = new Date().getTime()) => ({ id, username: userId, date: new Date().toLocaleString() });

const createAuthRouter = (filePath, sessions) => {
  const users = loadJSON(filePath);

  const injectSession = (req, res, next) => {
    if (!req.cookies) {
      return next();
    }
    const id = req.cookies.id;
    req.session = sessions[id];
    next();
  };

  const register = (req, res) => {
    const { body: { username, password } } = req;
    users.push({ username, password });
    storeJSON(filePath, users);
    res.status(201);
    res.end();
  }

  const login = (req, res) => {
    const { body: { userId, pass } } = req;
    const isValidUser = users.some(u => u.username == userId && u.password == pass);
    if (!isValidUser) {
      return res.status(401).end();
    }

    const session = createSession(userId, 1234);
    sessions[session.id] = session;
    res.cookie('id', session.id).status(201).end();
  }

  const logout = (req, res) => {
    const { id } = req.cookies;
    delete sessions[id];
    res.clearCookie('id').redirect('/');
  }

  const router = express.Router();
  router.use(injectSession);
  router.post('/login', login);
  router.post('/register', register)
  router.get('/logout', logout);
  return router;
}
module.exports = { createAuthRouter };