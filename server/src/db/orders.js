const client = require('./setup/postgres');

const getAllOrders = async () => {
  const query = 'SELECT * FROM orders';
  const result = await client.query(query);
  return result;
}

module.exports = {
  getAllOrders,
}