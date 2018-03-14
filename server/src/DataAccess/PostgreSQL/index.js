const { getOrdersByUserId, getOrderById, } = require('./orders');
const { register, getUserByEmail, getUserPasswordData, } = require('./users');
const { getOrderedFlights, } = require('./flights');
const { getOrderedPlaces, } = require('./places');

module.exports = {
  getOrdersByUserId,
  getOrderById,
  getUserByEmail,
  register,
  getUserPasswordData,
  getOrderedFlights,
  getOrderedPlaces,
};
