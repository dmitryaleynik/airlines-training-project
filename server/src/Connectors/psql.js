const db = require('../DataAccess/PostgreSQL');
const Order = require('../Contracts/ConnectorWithService/Order');

const {
  UserResponse,
  PasswordDataResponse,
} = require('../Contracts/ConnectorWithService/users');

const getAllOrders = async () => {
  const ordersToBeMapped = await db.getAllOrders();
  return ordersToBeMapped.rows.map(row => {
    return new Order(row.id, row.leave_at, row.status, row.total);
  });
};

const getUserByEmail = async ({ email, }) => {
  const result = (await db.getUserByEmail(email)).rows[0];
  return new UserResponse(
    result.user_id,
    result.email,
    result.nickname,
    result.avatar
  );
};

const register = async ({ email, passwordData, }) => {
  await db.register(email, passwordData);
  return true;
};

const getUserPasswordData = async ({ id, }) => {
  const result = (await db.getUserPasswordData(id)).rows[0];
  return new PasswordDataResponse(result.password_hash, result.password_salt);
};

module.exports = {
  getAllOrders,
  getUserByEmail,
  register,
  getUserPasswordData,
};
