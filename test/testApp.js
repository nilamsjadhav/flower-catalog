const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app.js');
const initApp = (sessions = {}) => createApp({
  guestBookPath: './test/testData/comment.json',
  guestBookTemplatePath: './resource/template.html',
  loginPagePath: './resource/login.html',
  databasePath: './test/testData/users.json',
}, sessions, fs.readFileSync);

describe('GET static pages', () => {
  let app;
  beforeEach(() => {
    app = initApp();
  })

  it('should return 200 when request is GET /', (done) => {
    request(app)
      .get('/')
      .expect('content-type', /html/)
      .expect(200, done);
  });

  it('should return 200 when request is GET /abeliophyllum.html', (done) => {
    request(app)
      .get('/abeliophyllum.html')
      .expect('content-type', /html/)
      .expect(200, done);
  });

  it('should return 200 when request is GET /ageratum.html', (done) => {
    request(app)
      .get('/ageratum.html')
      .expect('content-type', /html/)
      .expect(200, done);
  });
});

describe('GET non-existing page', () => {
  let app;
  beforeEach(() => {
    app = initApp();
  })

  it('should return 404 when page not found.', (done) => {
    request(app)
      .get('/something.html')
      .expect('content-type', /html/)
      .expect(404, done);
  });
});

describe('GET /guest-book', () => {

  it('should serve guest book when cookies are present', (done) => {
    const sessions = { 1: { id: 1, username: 'abc' } };
    const app = initApp(sessions);

    request(app)
      .get('/guest-book/show-guest-book')
      .set('cookie', 'id=1')
      .expect('content-type', /html/)
      .expect(200, done);
  });

  it('should serve login page when cookies are not present', (done) => {
    const app = initApp();
    request(app)
      .get('/guest-book')
      .expect('location', '/login.html')
      .expect(302, done);
  });
});

describe('GET /api/guest-book', () => {
  let app;
  beforeEach(() => {
    const sessions = { 1: { id: 1, username: 'abc' } };
    app = initApp(sessions);
  })

  it('should serve guest book api', (done) => {
    request(app)
      .get('/guest-book/api/comments')
      .set('cookie', 'id=1')
      .expect('content-type', /json/)
      .expect(200, done);
  });
});

describe('POST comments', () => {

  it('should post given comment', (done) => {
    const sessions = { 1: { id: 1, username: 'abc' } };
    let app = initApp(sessions);
    request(app)
      .post('/guest-book/add-comment')
      .set('cookie', 'id=1')
      .send('name=abc&comment=good flowers')
      .expect(201, done)
  });
});

describe('GET /logout', () => {

  it('should redirect to home page', (done) => {
    const sessions = { 1: { id: 1, username: 'abc' } };
    let app = initApp(sessions);
    request(app)
      .get('/logout')
      .set('cookie', 'id=1')
      .expect(302, done);
  });
});