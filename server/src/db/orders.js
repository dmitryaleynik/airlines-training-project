const client = require('./setup/postgres');

const getAllOrders = async () => {
  return await client.query('SELECT * FROM orders');
}

module.exports = {
  getAllOrders,
}