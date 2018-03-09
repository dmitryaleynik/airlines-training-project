const crypto = require('crypto');

const getRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const sha512 = (password, salt) => {
  salt = salt || getRandomString(16);
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const result = hash.digest('hex');
  return {
    salt,
    hash: result,
  };
};

module.exports = {
  sha512,
};
