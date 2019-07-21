#!/usr/bin/env node

/**
 * Simple test server for emulating long responses
 */

'use strict';

const http = require('http');
const program = require('commander');

// Script settings
const description = 'package for simple server testing';
const version = '1.0.0';
const defaultHost = '127.0.0.1';
const defaultPort = 3000;
const defaultDelay = 100; // ms


/**
 * The function to set up the test server
 *
 * @param   {String}   host    Host for listen
 * @param   {Number}   port    Port for listen
 * @param   {Number}   delay   Response delay
 * @returns {http.Server}      Started server
 */
//const runServer = (host, port, delay=0) => {
function runServer(host, port, delay=0) {
  const server = http.createServer(async (req, res) => {
    await timeout(delay);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`This is long response with ${delay} ms delay.\n`);
  });
  server.on('connection', sock => {
    console.log(
      'New connection [from: ' + sock.remoteAddress + ']: ' + new Date());
  });
  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
    console.log(`Used response delay ${delay} ms`);
  });
  return server;
}


/**
 * Wrapper for Promise with setTimeout function
 *
 * @param   {Number}   ms   Number of milliseconds
 * @returns {Promise}
 */
function timeout(ms) {
  if (Number.isSafeInteger(ms) && ms > 0) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  return Promise.resolve();
}


module.exports = runServer;


if (require.main == module) {
  program
    .description(description)
    .version(version, '-v, --version')
    .option('-p, --port <n>', 'An integer argument', val => +val, defaultPort)
    .option('-d, --delay <n>', 'Response delay time, ms', val => +val, defaultDelay)
    .parse(process.argv);

  const host = defaultHost;
  const port = program.port;
  const delay = program.delay;

  if (!Number.isSafeInteger(port) || port <= 0) {
    console.error('Port should be the natural number!');
    process.exit(1);
  }
  if (!Number.isSafeInteger(delay) || delay <= 0) {
    console.error('Response delay time should be the natural number!');
    process.exit(1);
  }

  // Main Script
  runServer(host, port, delay);
}

