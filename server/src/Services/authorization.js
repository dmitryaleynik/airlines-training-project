const jwt = require('jsonwebtoken');
const dbConnector = require('../Connectors/psql');
const { sha512, } = require('../utils/createHash');

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
    return new AuthResponse(null, { userNotFound: true, });
  }
  const passwordData = await dbConnector.getUserPasswordData(
    new PasswordDataRequest(user.id)
  );
  const hashToBeCompared = sha512(password, passwordData.salt).hash;
  if (hashToBeCompared !== passwordData.hash) {
    return new AuthResponse(null, { wrongPassword: true, });
  }

  const token = jwt.sign({ id: user.id, email, }, process.env.AUTH_KEY, {
    algorithm: 'HS512',
    expiresIn: '1d',
  });
  return new AuthResponse(token);
};

module.exports = {
  authorize,
};
