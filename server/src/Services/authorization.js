const jwt = require('jsonwebtoken');
const dbConnector = require('../Connectors/psql');
const { sha512, } = require('../utils/createHash');

const UserNotFoundException = require('../Exceptions/UserNotFoundEsception');
const WrongPasswordException = require('../Exceptions/WrongPasswordException');

const {
  UserByEmailRequest,
  PasswordDataRequest,
} = require('../Contracts/ConnectorWithService/users');
const {
  AuthResponse,
} = require('../Contracts/ServiceWithHandler/authorization');

const authorize = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(new UserByEmailRequest(email));
  if (!user.id) {
    throw new UserNotFoundException();
  }
  const passwordData = await dbConnector.getUserPasswordData(
    new PasswordDataRequest(user.id)
  );
  const hashToBeCompared = sha512(password, passwordData.salt).hash;
  if (hashToBeCompared !== passwordData.hash) {
    throw new WrongPasswordException();
  }

  const token = jwt.sign({ email, }, 'AZAZAZA', {
    algorithm: 'HS512',
    expiresIn: '2h',
  });
  return new AuthResponse(token);
};

module.exports = {
  authorize,
};
