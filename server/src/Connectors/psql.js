const db = require('../DataAccess/PostgreSQL');
const Order = require('../Contracts/ConnectorToService/Order');

const getAllOrders = async () => {
  const ordersToBeMapped = await db.getAllOrders();
  return ordersToBeMapped.rows.map(row => {
    return new Order(row.id, row.leave_at, row.status, row.total);
  });
};

const checkEmailUniqueness = async email => {
  const result = await db.getUserByEmail(email);
  return result.rows[0].user_id ? false : true;
};

const register = async (email, passwordData) => {
  await db.register(email, passwordData);
  return true;
};

module.exports = {
  getAllOrders,
  checkEmailUniqueness,
  register,
};
