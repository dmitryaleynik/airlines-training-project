const { readFilePromise, } = require('../../utils/promises');
const client = require('./setup');

const defaultAvatarPath = `${__dirname}/../../assets/default_avatar.png`;

const getUserByEmail = async email => {
  const queryText = 'SELECT * from get_user_by_email($1);';
  const values = [email,];
  return await client.query(queryText, values);
};

const register = async (email, { hash, salt, }) => {
  const avatar = await readFilePromise(defaultAvatarPath);
  const queryText = 'SELECT insert_user($1, $2, $3, $4);';
  const values = [email, hash, salt, avatar,];
  const result = await client.query(queryText, values);
  return result;
};

const getUserPasswordData = async id => {
  const queryText = 'SELECT * from get_password_data($1)';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getUserByEmail,
  register,
  getUserPasswordData,
};
