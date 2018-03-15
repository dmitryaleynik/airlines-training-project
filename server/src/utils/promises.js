const { promisify, } = require('util');
const fs = require('fs');

module.exports.readFilePromise = promisify(fs.readFile);
