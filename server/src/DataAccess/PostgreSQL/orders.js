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

const createOrder = async ({ flightId, userId, expiresAt, }) => {
  const queryText = 'SELECT * FROM create_order($1, $2, $3);';
  const values = [flightId, userId, expiresAt,];
  const result = await client.query(queryText, values);
  return result;
};

const confirmOrder = async id => {
  const queryText = 'SELECT * FROM confirm_order($1);';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

const cancelOrder = async id => {
  const queryText = 'SELECT * FROM cancel_order($1);';
  const values = [id,];
  const result = await client.query(queryText, values);
  return result;
};

const checkOrdersStatuses = async flightIds => {
  const queryText = 'SELECT * FROM update_orders_statuses($1);';
  const values = [flightIds,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrdersByUserId,
  getOrderById,
  createOrder,
  confirmOrder,
  cancelOrder,
  checkOrdersStatuses,
};
