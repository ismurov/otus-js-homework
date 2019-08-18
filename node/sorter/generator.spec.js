'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const createFile = require('./generator');


const TEST_PATH = '.';
const TEST_DIR = path.join(TEST_PATH, 'test_dir_' + Date.now() + '.temp');
const FILE = path.join(TEST_DIR, 'file.txt')
const FILE_SIZE = 1024 // bytes
const MIN = 0
const MAX = 100

const sleep = (ms) => new Promise(resolve=>{
  setTimeout(resolve,ms);
});

beforeAll(async () => {
  fs.mkdirSync(TEST_DIR);
  // generate test file
  await createFile(FILE, FILE_SIZE, MIN, MAX);
});

afterAll(() => {
  // remove test dir
  fse.remove(TEST_DIR);
});

describe('Function createFile', () => {
  it(`should create a file larger than ${FILE_SIZE} bytes`, () => {
    var stats = fs.statSync(FILE);
    expect(stats["size"]).toBeGreaterThanOrEqual(FILE_SIZE);
  });

  it('should create a file with data separated by \'\\n\'', () => {
    const data = fs.readFileSync(FILE);
    const lines = data.toString().split('\n');
    expect(lines).not.toHaveLength(1);
  });

  it('should create a file with integers', () => {
    const data = fs.readFileSync(FILE);
    const lines = data.toString().split('\n');
    for (let i = 0; i < lines.length; i++) {
      const num = +lines[i]
      expect(num).not.toBeNaN();
      expect(Number.isInteger(num)).toBe(true);
    }
  });

  it(`should create a file with integers in range (${MIN} <= x <= ${MAX})`, () => {
    const data = fs.readFileSync(FILE);
    const lines = data.toString().split('\n');
    for (let i = 0; i < lines.length; i++) {
      const num = +lines[i]
      expect(num).toBeGreaterThanOrEqual(MIN);
      expect(num).toBeLessThanOrEqual(MAX);
    }
  });
});

