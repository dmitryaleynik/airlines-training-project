const { getOrdersByUserId, getOrderById, } = require('./orders');
const { register, getUserByEmail, getUserPasswordData, } = require('./users');

module.exports = {
  getOrdersByUserId,
  getOrderById,
  getUserByEmail,
  register,
  getUserPasswordData,
};
