const { sha512, } = require('../utils/createHash');
const dbConnector = require('../Connectors/psql');
const {
  RegistrationRequest,
  UserByEmailRequest,
} = require('../Contracts/ConnectorWithService/users');

const EmailUsedException = require('../Exceptions/EmailUsedException');

const register = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(new UserByEmailRequest(email));
  if (user.id) {
    throw new EmailUsedException();
  }
  const passwordData = sha512(password);
  await dbConnector.register(new RegistrationRequest(email, passwordData));
  return true;
};

module.exports = {
  register,
};
