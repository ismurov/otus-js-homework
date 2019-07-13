'use strict';

const http = require('http');
const request = require('supertest');
const runServer = require('./server');


const consoleLog = console.log;
let server;

const HOST = '127.0.0.1';
const PORT = 3333;
const DELAY = 100;  // ms

const sleep = (ms) => new Promise(resolve=>{
  setTimeout(resolve,ms);
});


describe('Function runServer', () => {
  beforeEach(async () => {
    console.log = jest.fn();
    server = runServer(HOST, PORT, DELAY);
    // Wait until the server is fully started
    await sleep(10);
  });

  afterEach(async () => {
    await server.close();
    console.log = consoleLog;
  });

  it('should returns instance of http.Server', () => {
    expect(server).toBeInstanceOf(http.Server);
  });

  it('should response with http status code 200', done => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should response with content type \'text/plain\'', done => {
    request(server)
      .get('/')
      .expect('Content-Type', 'text/plain', done);
  });

  it(`should response with body: 'This is long response with ${DELAY} ms delay.\n'`, done => {
    request(server)
      .get('/')
      .expect(200, `This is long response with ${DELAY} ms delay.\n`, done);
  });

  it (`should response longer that ${DELAY} ms`, done => {
    const timeStart = new Date;
    request(server)
      .get('/')
      .end(err => {
        if (err) {
          return done(err);
        }
        expect(new Date - timeStart).toBeGreaterThanOrEqual(DELAY);
        done();
      });
  })
});

