const Exception = require('./Exception');

class EmailUsedException extends Exception {
  constructor() {
    super('Email is already used.');
  }
}

module.exports = EmailUsedException;
