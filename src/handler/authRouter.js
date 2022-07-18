const express = require('express');
const cookieSession = require('cookie-session');
const { loadJSON, storeJSON } = require("./dataStore");

const createSession = (userId, id = new Date().getTime()) => ({ id, username: userId, date: new Date().toLocaleString() });

const createAuthRouter = (filePath, sessions) => {
  const users = loadJSON(filePath);

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
    req.session.id = session;
    res.status(201).end();
  }

  const logout = (req, res) => {
    const { id } = req.session.id;
    delete sessions[id];
    req.session = null;
    res.redirect('/');
  }

  const router = express.Router();
  router.use(cookieSession({ name: 'session', keys: ['key1'] }));
  router.post('/login', login);
  router.post('/register', register)
  router.get('/logout', logout);
  return router;
}
module.exports = { createAuthRouter };