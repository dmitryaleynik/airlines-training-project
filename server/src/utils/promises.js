const { promisify, } = require('util');
const passport = require('koa-passport');
const fs = require('fs');

module.exports.authenticatePromise = promisify(
  passport.authenticate('jwt', { session: false, })
);

module.exports.readFilePromise = promisify(fs.readFile);
