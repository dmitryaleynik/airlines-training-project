const jwt = require('jsonwebtoken');
const dbConnector = require('../Connectors/psql');
const { sha512, } = require('../utils/createHash');

const UserNotFoundException = require('../Exceptions/UserNotFoundEsception');
const WrongPasswordException = require('../Exceptions/WrongPasswordException');

const authorize = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(email);
  if (!user.id) {
    throw new UserNotFoundException();
  }
  const passwordData = await dbConnector.getUserPasswordData(user.id);
  const hashToBeCompared = sha512(password, passwordData.salt).hash;
  if (hashToBeCompared !== passwordData.hash) {
    throw new WrongPasswordException();
  }

  return jwt.sign({ email, }, 'AZAZAZA', {
    algorithm: 'HS512',
    expiresIn: '2h',
  });
};

module.exports = {
  authorize,
};
