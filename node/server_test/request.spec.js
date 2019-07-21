'use strict';

const http = require('http');
const {doRequestMany, doRequest} = require('./request');


const consoleLog = console.log;
let server;

const HOST = '127.0.0.1';
const PORT = 3334
const URL = `http://${HOST}:${PORT}/`

beforeAll(async () => {
  // Create Test Server
  server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is Test Server.\n');
  });
  server.listen(PORT, HOST);
  // Wait until the server is fully started
  await new Promise(resolve=>{
    setTimeout(resolve, 10);
  });
  // Disable console.log
  console.log = jest.fn();
});


afterAll(() => {
  // Stop Test Server
  server.close();
  // Enable console.log
  console.log = consoleLog;
});


describe('Function doRequest', () => {
  it('should returns function-wrapper', async () => {
    expect(doRequest(URL)).toBeInstanceOf(Function);
  });

  it('should returns Promise after returns function-wrapper', () => {
    expect(doRequest(URL)()).toBeInstanceOf(Promise);
  });

  describe('after Promise resolved should contained request information.', () => {
    describe('Request information', () => {
      it('should have error if url is invalid', async () => {
        const result = await doRequest('http://sdfdsfsdfsd')();
        expect(result.error).toBeDefined();
      });

      it('should haven\'t error if request is success (error === undefined)', async () => {
        const result = await doRequest(URL)();
        expect(result.error).toBeUndefined();
      });

      it('should contain time of start request', async () => {
        const timeStart = new Date();
        const result = await doRequest(URL)()
        expect(+result.time).toBeGreaterThanOrEqual(+timeStart);
      });

      it('should contain time of start request (time instanceof Date)', async () => {
        const result = await doRequest(URL)()
        expect(result.time).toBeInstanceOf(Date);
      });

      it('should contain duration of request', async () => {
        const timeStart = new Date();
        const result = await doRequest(URL)();
        const timeEnd = new Date();
        expect(result.duration).toBeLessThanOrEqual(timeEnd - timeStart);
      });

      it('should contain status code of request (code === 200)', async () => {
        const result = await doRequest(URL)();
        expect(result.code).toBe(200);
      });

      it('should contain body of request (body === \'This is Test Server.\n\')', async () => {
        const result = await doRequest(URL)();
        expect(result.body).toBe('This is Test Server.\n');
      });

    });
  });
});


describe('Function doRequestMany', () => {
  it('should returns array', async () => {
    const results = await doRequestMany(URL, 5);
    expect(results).toBeInstanceOf(Array);
  });

  it('should returns array with length 5', async () => {
    const results = await doRequestMany(URL, 5);
    expect(results.length).toBe(5);
  });

  it('should returns array of results like result of doRequest function', async () => {
    const results = await doRequestMany(URL, 2);
    expect(results).toMatchObject([
      {
        code: 200,
        body: 'This is Test Server.\n'
      },
      {
        code: 200,
        body: 'This is Test Server.\n'
      }
    ]);
  });
});
