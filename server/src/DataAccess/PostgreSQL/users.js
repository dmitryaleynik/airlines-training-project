const client = require('./setup');

const getUserByEmail = async email => {
  const queryText = 'SELECT * from get_user_by_email($1);';
  const values = [email,];
  return await client.query(queryText, values);
};

const register = async (email, { hash, salt, }) => {
  const queryText = 'SELECT insert_user($1, $2, $3);';
  const values = [email, hash, salt,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getUserByEmail,
  register,
};
