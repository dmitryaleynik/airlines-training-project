const client = require('./setup');

const getAllOrders = async () => {
  const query = 'SELECT * from get_all_orders()';
  const result = await client.query(query);
  return result;
}

module.exports = {
  getAllOrders,
}