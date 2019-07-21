#!/usr/bin/env node

/**
 * Script to search for files and folders in the selected system path
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
const program = require('commander');
const { description, version } = require('./package.json')

const defaultPath = '.'


/**
 * Function to search for files and directories in a given directory
 *
 * @param   {String}   p   Search path
 * @returns {Object}       Object with searching results:
 *                         {
 *                           files: ['bar/foo.txt'],
 *                           dirs: ['bar']
 *                         }
 */
async function tree (rootPath) {
  // path validation
  const stat = await fs.stat(rootPath);
  if (!stat.isDirectory()) {
    throw new Error(`Path '${rootPath}' is not a directory`);
  }

  // common variables
  const results = {
    files: [],
    dirs: [rootPath]
  };
  const options = {
    withFileTypes: true
  };

  // function handler
  const searchDir = searchPath => {
    return fs.readdir(searchPath, options)
      .then(async dirItems => {
        const newPromises = []
        dirItems.forEach(dirent => {
          const itemPath = path.join(searchPath, dirent.name);
          if (dirent.isFile()) {
            // file handler
            results.files.push(itemPath);
          } else if (dirent.isDirectory()) {
            // directory handler
            results.dirs.push(itemPath);
            newPromises.push(searchDir(itemPath));
          }
        });
        if (newPromises.length > 0) {
          // waiting for the processing of child directories
          await Promise.all(newPromises)
            .catch(console.error);
        }
      });
  };

  await searchDir(rootPath);
  return results;
}


module.exports = tree;


if (require.main === module) {
    program
    .description(description)
    .version(version, '-v, --version')
    .option('-p, --path <path>', 'search path', defaultPath)
    .parse(process.argv)

  const sPath = program.path;

  console.log(`Search in '${sPath}' path...`);

  tree(sPath)
    .then(res => {
      console.log('Results:');
      console.log(res);
    })
    .catch(console.error);
}

