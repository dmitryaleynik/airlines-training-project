const client = require('./setup');

const getUserByEmail = async email => {
  const queryText = `SELECT get_user_by_email('${email}') as id;`;
  return await client.query(queryText);
};

const register = async (email, { hash, salt, }) => {
  const queryText = `SELECT insert_user('${email}', '${hash}', '${salt}');`;
  const result = await client.query(queryText);
  return result;
};

module.exports = {
  getUserByEmail,
  register,
};
