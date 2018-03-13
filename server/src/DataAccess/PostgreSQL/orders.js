const client = require('./setup');

const getOrdersByUserId = async id => {
  const queryText = 'SELECT * from get_orders_by_user_id($1)';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrdersByUserId,
};
