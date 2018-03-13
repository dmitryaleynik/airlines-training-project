const { promisify, } = require('util');
const passport = require('koa-passport');

module.exports.authenticatePromise = promisify(
  passport.authenticate('jwt', { session: false, })
);
