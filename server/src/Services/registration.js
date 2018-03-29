const dbConnector = require('../Connectors/psql');
const { sha512, } = require('../utils/createHash');
const { readFilePromise, } = require('../utils/promises');

const defaultAvatarPath = `${__dirname}/../assets/default_avatar.png`;

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

  const avatar = {
    type: 'data:image/png;base64',
    data: await readFilePromise(defaultAvatarPath),
  };

  await dbConnector.register(
    new RegistrationRequest(email, passwordData, avatar)
  );
  return new RegistrationResponse(true);
};

module.exports = {
  register,
};
