const {
  getOrdersByUserId,
  getOrderById,
  createOrder,
  confirmOrder,
  cancelOrder,
  checkOrdersStatuses,
} = require('./orders');
const {
  register,
  getUserByEmail,
  getUserPasswordData,
  changeNickname,
  getUserWithAvatar,
  changeAvatar,
} = require('./users');
const {
  getOrderedFlights,
  getAllCities,
  getFlightsByFilters,
  linkFlightWithOrderWithLuggage,
  linkFlightWithOrder,
  checkFlightLinkage,
} = require('./flights');
const {
  getOrderedPlaces,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
  getPlacesByNumbers,
  linkPlaceWithOrder,
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
  getPlacesByNumbers,
  createOrder,
  linkFlightWithOrderWithLuggage,
  linkFlightWithOrder,
  linkPlaceWithOrder,
  checkFlightLinkage,
  confirmOrder,
  cancelOrder,
  checkOrdersStatuses,
  changeNickname,
  getUserWithAvatar,
  changeAvatar,
};
