#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const stream = require('stream');
const readline = require('readline');
const program = require('commander');

// Info
const version = '1.0.0'
const description = 'Script to generate a file of a given size ' +
                    'with random numbers separated by a new line.'

// Default settings
const defaultFile = "./bigfile.txt";
const defaultSize = 100;  // Megabytes
const defaultMin = 0;
const defaultMax = 999999;


/**
 * Function to generate a random integer in a given range (min <= x <= max).
 */
function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


/**
 * Function to display the recording process with replacing old values in console.
 */
function showProgress(current, total) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  if (current < total) {
    process.stdout.write(`Written ${current} of ${total} bytes...`);
  } else {
    process.stdout.write(`${current} bytes was written.\n`);
  }
}


/**
 * Function for generate a file of a given size
 * with random numbers separated by a new line.
 * A stream is used to write to a file.
 *
 * @param   {String}    filePath      Path and name for the generated file.
 * @param   {Number}    fileSize      Size of output file in bytes.
 * @param   {Number}    minNum        Minimum generated number.
 * @param   {Number}    maxNum        Maximum generated number.
 * @param   {Boolean}   verbose       Show detailed generation process in console.
 * @returns {Promise}                 Resolved when file will be generated
 *                                    with the number of bytes written.
 */
function createFile(filePath, size=1, minNum=0, maxNum=10, verbose=false) {
  return new Promise(resolve => {
    const progress = (cur, all) => verbose ? showProgress(cur, all) : null;

    let written = 0;

    const file = fs.createWriteStream(filePath, {flags: 'w+'});
    file.on('close', () => {
      progress(written, size);
      resolve(written);
    });

    write();

    function write() {
      progress(written, size);
      while (written < size) {
        let s = '' + randomInt(minNum, maxNum) + '\n';
        if (!file.write(s)) {
          file.once('drain', write);
          return;
        }
        written += s.length;
      }
      file.end();
    }
  });
}


module.exports = createFile;


if (require.main === module) {
  program
    .description(description)
    .version(version, '-v, --version')
    .option('-f, --file <path>', 'path and name for the generated file', defaultFile)
    .option('-s, --size <n>', 'size of output file in megabytes', num => +num, defaultSize)
    .option('--min <n>', 'minimum generated number', num => +num, defaultMin)
    .option('--max <n>', 'maximum generated number', num => +num, defaultMax)
    .parse(process.argv)

  const file = program.file;
  const size = program.size;
  const minNum = program.min;
  const maxNum = program.max;

  const parsePath = path.parse(file)
  if (parsePath.dir && !fs.existsSync(parsePath.dir)) {
    console.error('Specified directory does not exist!');
    process.exit(1);
  }

  if (!Number.isSafeInteger(size) || size <= 0) {
    console.error('The size of file should be the natural number!');
    process.exit(1);
  }

  if (!Number.isSafeInteger(minNum)) {
    console.error('The minimum generated number should be the number!');
    process.exit(1);
  }

  if (!Number.isSafeInteger(maxNum)) {
    console.error('The maximum generated number should be the number!');
    process.exit(1);
  }

  const fileSize = size * 1024 * 1024;  // MB -> B
  createFile(file, fileSize, minNum, maxNum, true)
    .then(() => {
      console.log(`Saved in ${file}`);
    })
    .catch(console.log);
}

