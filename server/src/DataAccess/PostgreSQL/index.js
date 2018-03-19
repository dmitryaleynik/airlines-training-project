const { getOrdersByUserId, getOrderById, } = require('./orders');
const { register, getUserByEmail, getUserPasswordData, } = require('./users');
const {
  getOrderedFlights,
  getAllCities,
  getFlightsByFilters,
} = require('./flights');
const {
  getOrderedPlaces,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
} = require('./places');

module.exports = {
  getOrdersByUserId,
  getOrderById,
  getUserByEmail,
  register,
  getUserPasswordData,
  getOrderedFlights,
  getOrderedPlaces,
  getAllCities,
  getFlightsByFilters,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
};
