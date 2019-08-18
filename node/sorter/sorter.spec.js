'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const generator = require('./generator');
const sorter = require('./sorter');

const mergeFileSort = sorter;
const readByLine = sorter.readByLine;


// Setting
const TEST_PATH = '.';
const TEST_DIR = path.join(TEST_PATH, 'test_dir_' + Date.now() + '.temp');


const sleep = (ms) => new Promise(resolve=>{
  setTimeout(resolve,ms);
});

beforeAll(() => {
  fs.mkdirSync(TEST_DIR);
});

afterAll(() => {
  // remove test dir
  fse.remove(TEST_DIR);
});


describe('Function readByLine', () => {
  let file;
  let data;

  beforeAll(() => {
    file = path.join(TEST_DIR, 'smallfile.txt');
    // generate test data
    data = (() => {
      const arr = new Array(50);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = i;
      }
      return arr.join('\n')
    })();
    fs.writeFileSync(file, data);
  });

  afterAll(() => {
    fs.unlinkSync(file);
  });

  it('should be read line by line from separated data', async () => {
    const dataLocal = ['1\n2\n3', '4\n56\n', '90']
    const lines = ['1', '2', '34', '56', '90']
    const gen = readByLine(dataLocal)();
    let i = 0;
    for await (const line of gen) {
      expect(line).toBe(lines[i]);
      i++;
    }
  });

  it('should read from file stream line by line', async () => {
    const inputStream = fs.createReadStream(file, {highWaterMark: 16});
    const fileLines = readByLine(inputStream)();
    const dataLines = data.split('\n');
    let dataIndex = 0;
    for await (const line of fileLines) {
      expect(line).toBe(dataLines[dataIndex]);
      dataIndex++
    }
  });
});


describe('Function mergeFileSort', () => {
  let file;
  let fileSize;
  let resultFile;
  let minNum;
  let maxNum;

  beforeAll(async () => {
    file = path.join(TEST_DIR, 'bigfile.txt');
    fileSize = 1 * 1024 * 1024; // 1MB
    resultFile = file + '.sorted';
    minNum = 0;
    maxNum = 1000;
    await generator(file, fileSize, minNum, maxNum);
    // run sorting file (long task)
    await mergeFileSort(file, resultFile);
  });

  afterAll(() => {
    fs.unlinkSync(file);
    fs.unlinkSync(resultFile);
  });

  it('should sort file correctly (long test!)', async () => {
    const data = fs.readFileSync(resultFile);
    const lines = data.toString().trimRight().split('\n');
    let min = minNum;
    for (let i = 0; i < lines.length; i++){
      const num = +lines[i];
      expect(num).toBeGreaterThanOrEqual(min);
      min = num;
    }
    expect(min).toBeLessThanOrEqual(maxNum);
  });
});

