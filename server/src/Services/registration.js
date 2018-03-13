const { sha512, } = require('../utils/createHash');
const dbConnector = require('../Connectors/psql');

const {
  RegistrationRequest,
  UserByEmailRequest,
} = require('../Contracts/ConnectorWithService/users');
const {
  RegistrationResponse,
} = require('../Contracts/ServiceWithHandler/registration');

const register = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(new UserByEmailRequest(email));
  if (user.id) {
    return new RegistrationResponse(null, { emailUsed: true, });
  }
  const passwordData = sha512(password);
  await dbConnector.register(new RegistrationRequest(email, passwordData));
  return new RegistrationResponse(true);
};

module.exports = {
  register,
};
