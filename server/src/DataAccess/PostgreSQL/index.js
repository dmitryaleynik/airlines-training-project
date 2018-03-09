const { getAllOrders, } = require('./orders');
const { register, getUserByEmail, getUserPasswordData, } = require('./users');

module.exports = {
  getAllOrders,
  getUserByEmail,
  register,
  getUserPasswordData,
};
