const client = require('./setup');

const getOrdersByUserId = async id => {
  const queryText = 'SELECT * FROM get_orders_by_user_id($1);';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

const getOrderById = async ({ userId, orderId, }) => {
  const queryText = 'SELECT * FROM get_order_by_id($1, $2);';
  const values = [userId, orderId,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrdersByUserId,
  getOrderById,
};
