const { sha512, } = require('../utils/createHash');
const dbConnector = require('../Connectors/psql');
const {
  RegistrationResponse,
} = require('../Contracts/ServiceWithHandler/registration');
const {
  RegistrationRequest,
} = require('../Contracts/ConnectorWithService/registration');
const EmailUsedException = require('../Exceptions/EmailUsedException');

const register = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(email);
  if (user.id) {
    throw new EmailUsedException();
  }
  const passwordData = sha512(password);
  const result = await dbConnector.register(
    new RegistrationRequest(email, passwordData)
  );
  return new RegistrationResponse(result);
};

module.exports = {
  register,
};
