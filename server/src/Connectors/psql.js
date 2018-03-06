const db = require('../DataAccess/PostgreSQL');
const Order = require('../Contracts/ConnectorToService/Order');

const getAllOrders = async () => {
  const ordersToBeMapped = await db.getAllOrders();
  return ordersToBeMapped.rows.map(row => {
    return new Order(row.id, row.leave_at, row.status, row.total);
  });
};

module.exports = {
  getAllOrders,
};
