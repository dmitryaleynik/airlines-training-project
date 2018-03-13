const { getOrdersByUserId, } = require('./orders');
const { register, getUserByEmail, getUserPasswordData, } = require('./users');

module.exports = {
  getOrdersByUserId,
  getUserByEmail,
  register,
  getUserPasswordData,
};
