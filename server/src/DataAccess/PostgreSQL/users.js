const client = require('./setup');

const getUserByEmail = async email => {
  const queryText = 'SELECT * FROM get_user_by_email($1);';
  const values = [email,];
  return await client.query(queryText, values);
};

const register = async (email, { hash, salt, }, { data, type, }) => {
  const queryText = 'SELECT insert_user($1, $2, $3, $4, $5);';
  const values = [email, hash, salt, data, type,];
  const result = await client.query(queryText, values);
  return result;
};

const getUserPasswordData = async id => {
  const queryText = 'SELECT * FROM get_password_data($1)';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

const changeNickname = async ({ id, nickname, }) => {
  const queryText = 'SELECT * FROM change_nickname($1, $2)';
  const values = [id, nickname,];
  const result = await client.query(queryText, values);
  return result;
};

const getUserWithAvatar = async id => {
  const queryText = 'SELECT * FROM get_user_with_avatar_by_id($1)';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

const changeAvatar = async (id, { data, type, }) => {
  const queryText = 'SELECT * FROM change_avatar($1, $2, $3)';
  const values = [id, data, type,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getUserByEmail,
  register,
  getUserPasswordData,
  changeNickname,
  getUserWithAvatar,
  changeAvatar,
};
