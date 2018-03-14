const db = require('../DataAccess/PostgreSQL');

const { OrderResponse, } = require('../Contracts/ConnectorWithService/orders');
const {
  UserResponse,
  PasswordDataResponse,
} = require('../Contracts/ConnectorWithService/users');

const getOrdersByUserId = async ({ id, }) => {
  const ordersToBeMapped = await db.getOrdersByUserId(id);
  return ordersToBeMapped.rows.map(row => {
    return new OrderResponse(
      row.order_id,
      row.status,
      row.total,
      row.expires_at
    );
  });
};

const getOrderById = async ({ id, }) => {
  const result = (await db.getOrderById(id)).rows[0];
  return new OrderResponse(
    result.order_id,
    result.status,
    result.total,
    result.expires_at
  );
};

const getUserByEmail = async ({ email, }) => {
  const result = (await db.getUserByEmail(email)).rows[0];
  return new UserResponse(result.user_id, result.email, result.nickname);
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
  getOrdersByUserId,
  getOrderById,
  getUserByEmail,
  register,
  getUserPasswordData,
};
