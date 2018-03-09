const jwt = require('jsonwebtoken');
const dbConnector = require('../Connectors/psql');
const { sha512, } = require('../utils/createHash');

const authorize = async ({ email, password, }) => {
  const user = await dbConnector.getUserByEmail(email);
  if (!user.id) {
    logger.info('kek');
    return;
  }
  const passwordData = await dbConnector.getUserPasswordData(user.id);
  const hashToBeCompared = sha512(password, passwordData.salt).hash;
  if (hashToBeCompared !== passwordData.hash) {
    logger.info('lol');
    return;
  }

  return jwt.sign({ email, }, 'AZAZAZA', {
    algorithm: 'HS512',
    expiresIn: '2h',
  });
};

module.exports = {
  authorize,
};
