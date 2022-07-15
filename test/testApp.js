const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('GET static pages', () => {
  let app;
  beforeEach(() => {
    const appConfig = {
      guestBookPath: './test/testData/comment.json',
      staticSrcPath: './resource/template.html',
      loginPagePath: './public/login.html',
      databasePath: './test/testData/users.json',
      serveFrom: './public'
    };
    app = createApp(appConfig, {}, fs.readFileSync);
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
    const appConfig = {
      guestBookPath: './test/testData/comment.json',
      staticSrcPath: './resource/template.html',
      loginPagePath: './public/login.html',
      databasePath: './test/testData/users.json',
      serveFrom: './public'
    };
    app = createApp(appConfig, {}, fs.readFileSync);
  })

  it('should return 404 when page not found.', (done) => {
    request(app)
      .get('/something.html')
      .expect('content-type', /html/)
      .expect(404, done);
  });
});

describe('GET /guest-book', () => {
  const appConfig = {
    guestBookPath: './test/testData/comment.json',
    staticSrcPath: './resource/template.html',
    loginPagePath: './public/login.html',
    databasePath: './test/testData/users.json',
    serveFrom: './public'
  };

  it('should serve guest book when cookies are present', (done) => {
    const sessions = { 1: { id: 1, username: 'abc' } };
    const myApp = createApp(appConfig, sessions, fs.readFileSync);

    request(myApp)
      .get('/guest-book')
      .set('cookie', 'id=1')
      .expect('content-type', /html/)
      .expect('location', '/show-guest-book')
      .expect(200, done);
  });

  it('should serve login page when cookies are not present', (done) => {
    const sessions = {};
    const myApp = createApp(appConfig, sessions, fs.readFileSync);
    request(myApp)
      .get('/guest-book')
      .expect('content-type', /html/)
      .expect('location', '/signin')
      .expect(200, done);
  });
});

describe('GET /api/guest-book', () => {
  let app;
  beforeEach(() => {
    const appConfig = {
      guestBookPath: './test/testData/comment.json',
      staticSrcPath: './resource/template.html',
      loginPagePath: './public/login.html',
      databasePath: './test/testData/users.json',
      serveFrom: './public'
    };
    const sessions = {};
    app = createApp(appConfig, sessions, fs.readFileSync);
  })

  it('should serve guest book api', (done) => {
    request(app)
      .get('/api/guest-book')
      .expect('content-type', /json/)
      .expect('location', '/api/guest-book')
      .expect(200, done);
  });
});

describe('POST comments', () => {
  let app;
  beforeEach(() => {
    const appConfig = {
      guestBookPath: './test/testData/comment.json',
      staticSrcPath: './resource/template.html',
      loginPagePath: './public/login.html',
      databasePath: './test/testData/users.json',
      serveFrom: './public'
    };
    const sessions = { 1: { id: 1, username: 'abc' } };
    app = createApp(appConfig, sessions, fs.readFileSync, fs.writeFileSync);
  })

  it('should post given comment', (done) => {
    request(app)
      .post('/add-comment')
      .set('cookie', 'id=1')
      .send('name=abc&comment=good flowers')
      .expect(201, done)
  });
});
