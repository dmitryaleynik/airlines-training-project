const Exception = require('./Exception');

class WrongPasswordException extends Exception {
  constructor() {
    super('Authorization failed. Wrong password.');
  }
}

module.exports = WrongPasswordException;
