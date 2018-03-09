const Exception = require('./Exception');

class EmailUsedException extends Exception {
  constructor() {
    super('Registration failed. Email is already used.');
  }
}

module.exports = EmailUsedException;
