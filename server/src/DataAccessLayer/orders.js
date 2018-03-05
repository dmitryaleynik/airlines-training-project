const client = require('./setup/postgres');
const Order = require('../contracts/orders');

const getAllOrders = async () => {
  const query = 'SELECT * from get_all_orders()';
  const result = await client.query(query);
  return result.rows.map(row => {
    return new Order(row.status, row.leave_at, row.total);
  });
}

module.exports = {
  getAllOrders,
}