const Exception = require('./Exception');

class UserNotFoundEsception extends Exception {
  constructor() {
    super('Authorization failed. User not found.');
  }
}

module.exports = UserNotFoundEsception;
