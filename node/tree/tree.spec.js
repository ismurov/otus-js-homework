'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const tree = require('./tree');


const TEST_PATH = '.';
const TEST_DIR = path.join(TEST_PATH, 'test_dir_' + Date.now() + '.temp');


beforeAll(() => {
  // create test dir, like this:
  // foo/
  // ├── bar/
  // │├── bar1.txt
  // │├── bar2.txt
  // │└── baz/
  // ├── f1.txt
  // └── f2.txt
  fs.mkdirSync(TEST_DIR);
  fs.mkdirSync(path.join(TEST_DIR, 'bar'));
  fs.writeFile(path.join(TEST_DIR, 'bar', 'bar1.txt'), '');
  fs.writeFile(path.join(TEST_DIR, 'bar', 'bar2.txt'), '');
  fs.mkdirSync(path.join(TEST_DIR, 'bar', 'baz'));
  fs.writeFile(path.join(TEST_DIR, 'f1.txt'), '');
  fs.writeFile(path.join(TEST_DIR, 'f2.txt'), '');
});


afterAll(() => {
  // remove test dir
  fse.remove(TEST_DIR);
});


describe('Function tree', () => {

  it('should raise error if the path does not exist', async () => {
    const dir = path.join(TEST_DIR, 'not_exist');
    await expect(tree(dir))
      .rejects
      .toThrow(`ENOENT: no such file or directory, stat '${dir}'`);
  });

  it('should raise error if the path is not a directory', async () => {
    const dir = path.join(TEST_DIR, 'f1.txt');
    await expect(tree(dir))
      .rejects
      .toThrow(`Path '${dir}' is not a directory`);
  });

  it('should return object with \'files\' and \'dirs\' fields', async () => {
    await expect(tree(TEST_DIR))
      .resolves
      .toEqual(expect.objectContaining({
        files: expect.any(Array),
        dirs: expect.any(Array)
      }));
  });

  it('should return the object with the contents of the test directory', async () => {
    await expect(tree(TEST_DIR))
      .resolves
      .toMatchObject({
        files: [
          path.join(TEST_DIR, 'f1.txt'),
          path.join(TEST_DIR, 'f2.txt'),
          path.join(TEST_DIR, 'bar', 'bar1.txt'),
          path.join(TEST_DIR, 'bar', 'bar2.txt')
        ],
        dirs: [
          TEST_DIR,
          path.join(TEST_DIR, 'bar'),
          path.join(TEST_DIR, 'bar', 'baz')
        ]
      });
  });
});
