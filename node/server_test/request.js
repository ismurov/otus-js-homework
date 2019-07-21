#!/usr/bin/env node

/**
 * Script to send requests to the test server
 */

'use strict';

const request = require('request');
const program = require('commander');

// Script settings
const description = 'Script to send requests to the test server'
const version = '1.0.0'
const defaultUrl = 'http://localhost:3000/'
const defaultRequestCount = 5


/**
 * The function makes an asynchronous request to the specified URL.
 *
 * @param   {String}   url  Url for request
 * @returns {Function}      Function that returns a promise
 *                          with information of request.
 *                          Returns object like this:
 *                          {
 *                            error: undefined,   // finished with error
 *                            time: [object Date] // the time when the request started
 *                            duration: 150       // ms
 *                            code: 200,          // response http status code
 *                            body: "foo\n",      // response body
 *                          }
 */
function doRequest(url) {
  return () => new Promise((resolve, reject) => {
    const timeStart = new Date();
      request.get(url, (error, response, body) => {
        const timeEnd = new Date();
        const result = {
          error: undefined,
          time: timeStart,
          duration: timeEnd - timeStart,
          code: response && response.statusCode,
          body: body
        }
        if (error) {
          result.error = error;
          return reject(result);
        }
        resolve(result);
    });
  }).catch(result => {
    console.error(result.error);
    return result;
  })
}


/**
 * The function of sending N request to the specified URL
 * with the choice of the type of parallelism of the request.
 *
 * @param   {String}   url       URL for requests
 * @param   {Number}   n         Number of requests
 * @param   {Bool}     doAsync   Flag to perform parallel requests
 * @returns {Array}              Array of request handler results
 */
async function doRequestMany(url, n=1, doAsync=false) {
  const handler = doRequest;
  let requests = Array(n).fill(handler(url));
  let results = [];
  if (doAsync) {
    results = await Promise.all(requests.map(fn => fn()));
  } else {
    for (let i = 0; i < requests.length; i++) {
      results[i] = await requests[i]();
    }
  }
  return results
}


module.exports.doRequest = doRequest
module.exports.doRequestMany = doRequestMany


if (require.main === module) {
  program
    .description(description)
    .version(version, '-v, --version')
    .option('-a, --address <url>', 'Address of test server with protocol (http or https)', url => url, defaultUrl)
    .option('-n, --number <n>', 'Number of requests to server', val => +val, defaultRequestCount)
    .option('--async', 'Do requests in parallel mode')
    .parse(process.argv)

  const serverAddr = program.address;
  const N = program.number;
  const flagAsync = !!program.async;

  if (!Number.isSafeInteger(N) || N <= 0) {
    console.error('Number of request to server should be the natural number!');
    process.exit(1);
  }

  // Main Script
  const mode = flagAsync ? '(async)' : '';
  console.log(`Run ${N} requests to ${serverAddr} ${mode}`);
  const timeRun = new Date();
  doRequestMany(serverAddr, N, flagAsync)
    .then(results => {
      let success = 0;
      let errors = 0;
      results.forEach((item, i) => {
        if (item.error) {
          errors++;
          console.log(`Request ${i}: Finished with ERROR`)
        } else {
          success++;
          console.log(`Request ${i}: Status code ${item.code} (${item.duration} ms)`);
        }
      });
      console.log(`Total resuests: ${results.length} (success: ${success}, errors: ${errors})`);
      console.log('Total time: ' + (new Date() - timeRun) + ' ms');
    });
}

