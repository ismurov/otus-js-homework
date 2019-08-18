#!/usr/bin/env node

'use strict';

const version = '1.0.0'
const description = 'Script to sort a file with numbers separated by a new line.'


const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const stream = require('stream');
const program = require('commander');

// Settings
const defaultFile = "bigfile.txt";
const sortBufferSize = 327680;  // sizeof Number: 64B => 20M (163840 => 10MB)
const tmpDir = ".processing.tmp";


/**
 * Function to create async generator for read data line by line
 * from stream.
 */
function readByLine(chunkStream) {
  return async function * () {
    let remaining = ''; // chunk may ends in the middle of a line
    for await (const chunk of chunkStream) {
      const chunkLines = (remaining + chunk).split('\n');
      remaining = chunkLines.pop();
      yield * chunkLines;
    }
    if (remaining) {
      yield remaining;
    }
  };
}


/**
 * Function for read array of integers from iterator by chunk.
 */
async function chunkReader(iterator, chunkSize) {
  let read = 0;
  let errors = 0;
  const numbers = [];

  while (read - errors < chunkSize) {
    const {done, value} = await iterator.next();
    if (done) {
      break;
    }
    read++;
    const num = +value
    if (isNaN(num)) {
      errors++;
      continue;
    }
    numbers.push(num);
  }
  return {
    done: !read,
    read,
    errors,
    numbers,
  };
};


/**
 * Function for pre-processing the file.
 * Splitting it into smaller parts with pre-sorting
 * and save in temporary files.
 *
 * @params   {String}   filePath   Path to processing file.
 * @params   {String}   dir        Directory for creating temporary files.
 * @params   {Number}   chunkSize  Buffer size for pre-sorting.
 * @returns  {Object}              Object with preprocessing results.
 */
async function preprocessing(filePath, dir, chunkSize) {
  let total = 0;
  let errors = 0;
  let fileIndex = 0;

  const files = [];
  const inputStream = fs.createReadStream(filePath, {highWaterMark: 64 * 1024});
  const lines = readByLine(inputStream)();
  while (true) {
    const chunk = await chunkReader(lines, chunkSize);
    if (chunk.done) {
      break;
    }
    total += chunk.read;
    errors += chunk.errors;
    chunk.numbers.sort((a,b) => a - b);
    const tmpFile = path.join(dir, 'sort' + `${fileIndex}`.padStart(6, "0"));
    await fs.promises.writeFile(tmpFile, chunk.numbers.join('\n'));
    files.push(tmpFile);
    fileIndex++;
  }
  return {
    total,
    errors,
    files
  };
}

async function createFileStream(file) {
  const inputStream = fs.createReadStream(file, {highWaterMark: 4 * 1024});
  const gen = readByLine(inputStream)();
  const init = await gen.next();
  return {
    file,
    value: init.value,
    done: init.done,
    next: async function(){
      const {done, value} = await gen.next();
      if (done) {
        this.done = true;
        return null;
      }
      this.value = +value;
      return this.value;
    }
  };
}

async function makeFileStreams(files) {
  const fileStreams = [];
  for (let i = 0; i < files.length; i++) {
    fileStreams.push(createFileStream(files[i]));
  }
  return await Promise.all(fileStreams);
}

function getIndexOfMinValue(arr) {
  let index = -1;
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i].value;
    if (current < min) {
      index = i;
      min = current;
    }
  }
  return index
}

async function streamSorterGen(files) {
  const sources = await makeFileStreams(files);
  const sorter = getIndexOfMinValue;
  return async function * () {
    while (sources.length > 0) {
      let index = sorter(sources);
      if (!~index){
        break;
      }
      const s = sources[index];
      yield s.value;
      await s.next()
      if (s.done) {
        sources[index] = sources[sources.length - 1]
        sources.length--;
      }
    }
  };
}

function getResultFilePath(filePath) {
 return filePath + '.sorted';
}

/**
 * Function for sorting large file with integers separated by a new line.
 *
 * @params   {String}   filePath    File path for sorting.
 * @params   {String}   resultPath  Path for result file.
 * @returns  {Promise}              Resolved when sorting is complete.
 *
 */
function mergeFileSort(filePath, resultPath) {
  return new Promise(async resolve => {
    const stat = await fs.promises.stat(filePath);
    if (!stat.isFile()) {
      throw new Error(`Path '${filePath}' is not a file`);
    }
    await fs.promises.mkdir(tmpDir, {recursive: true});

    console.log('Preprocessing file...');
    const {total, errors, files} = await preprocessing(filePath, tmpDir, sortBufferSize);
    console.log(`Read lines: ${total}, with errors: ${errors}, create temptory files: ${files.length}`);

    console.log('Sorting...');
    const numbersGen = await streamSorterGen(files).then(gen => gen());
    const out = fs.createWriteStream(resultPath, {flags: 'w+'});
    out.on('close', () => {
      console.log('Sorting complete!')
      fse.remove(tmpDir);
      resolve();
    });

    const buff = [];

    write();

    async function write() {
      while (true) {
        var line;
        if (buff.length) {
          line = buff.pop();
        } else {
          const {value, done} = await numbersGen.next();
          if (done) {
            break;
          }
          line = '' + value + '\n';
        }
        if (!out.write(line)) {
          buff.push(line);
          out.once('drain', write);
          return;
        }

      }
      out.end();
    }
  });
}


module.exports = mergeFileSort;
module.exports.readByLine = readByLine;


if (require.main === module) {
  program
    .description(description)
    .version(version, '-v, --version')
    .option('-f, --file <path>', 'path and name for the generated file', defaultFile)
    .parse(process.argv)

  const file = program.file;

  if (!fs.existsSync(file)) {
    console.error('Specified file does not exist!');
    process.exit(1);
  }

  const resultFile = getResultFilePath(file);
  mergeFileSort(file, resultFile).catch(console.log);
}

