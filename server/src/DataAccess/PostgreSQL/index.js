const { getAllOrders, } = require('./orders');
const { register, getUserByEmail, } = require('./users');

module.exports = {
  getAllOrders,
  getUserByEmail,
  register,
};
