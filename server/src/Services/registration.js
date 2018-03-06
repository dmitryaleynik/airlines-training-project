const { sha512, } = require('../utils/createHash');
const dbConnector = require('../Connectors/psql');

const register = async body => {
  const isEmailUnique = await dbConnector.checkEmailUniqueness(body.email);
  if (!isEmailUnique) {
    return 'BB';
  }
  const passwordData = sha512(body.password);
  const result = await dbConnector.register(body.email, passwordData);
  return result;
};

module.exports = {
  register,
};
