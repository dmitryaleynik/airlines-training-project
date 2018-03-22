const db = require('../DataAccess/PostgreSQL');

const {
  OrderResponse,
  OrderIdResponse,
} = require('../Contracts/ConnectorWithService/orders');
const {
  UserResponse,
  PasswordDataResponse,
  UserWithAvatarResponse,
} = require('../Contracts/ConnectorWithService/users');
const {
  FlightResponse,
  CitiesResponse,
  CheckFlightLinkageResponse,
} = require('../Contracts/ConnectorWithService/flights');
const {
  PlaceResponse,
  AvailablePlacesStatisticsResponse,
  PlaneSizesResponse,
} = require('../Contracts/ConnectorWithService/places');

const getOrdersByUserId = async ({ id, }) => {
  const ordersToBeMapped = (await db.getOrdersByUserId(id)).rows;
  return ordersToBeMapped.map(order => {
    return new OrderResponse(order);
  });
};

const getOrderById = async ids => {
  const result = (await db.getOrderById(ids)).rows[0];
  return new OrderResponse(result);
};

const getOrderedFlights = async ({ id, }) => {
  const flightsToBeMapped = (await db.getOrderedFlights(id)).rows;
  return flightsToBeMapped.map(flight => {
    return new FlightResponse(flight);
  });
};

const getOrderedPlaces = async ids => {
  const placesToBeMapped = (await db.getOrderedPlaces(ids)).rows;
  return placesToBeMapped.map(place => {
    return new PlaceResponse(place);
  });
};

const getUserByEmail = async ({ email, }) => {
  const result = (await db.getUserByEmail(email)).rows[0];
  return new UserResponse(result);
};

const register = async ({ email, passwordData, }) => {
  await db.register(email, passwordData);
  return true;
};

const getUserPasswordData = async ({ id, }) => {
  const result = (await db.getUserPasswordData(id)).rows[0];
  return new PasswordDataResponse(result.password_hash, result.password_salt);
};

const getAllCities = async () => {
  const result = (await db.getAllCities()).rows;
  return new CitiesResponse(result);
};

const getFlightsByFilters = async ({ filters, }) => {
  const flightsToBeMapped = (await db.getFlightsByFilters(filters)).rows;
  return flightsToBeMapped.map(flight => {
    return new FlightResponse(flight);
  });
};

const countAvailablePlaces = async ({ flightId, }) => {
  const stat = (await db.countAvailablePlaces(flightId)).rows;
  return stat.map(row => {
    return new AvailablePlacesStatisticsResponse(row);
  });
};

const getPlaneSizes = async ({ flightId, }) => {
  const res = (await db.getPlaneSizes(flightId)).rows;
  if (!res.length) {
    return new PlaneSizesResponse({});
  }
  return new PlaneSizesResponse(res[0]);
};

const getPlacesWithAvailability = async ({ flightId, }) => {
  const res = (await db.getPlacesWithAvailability(flightId)).rows;
  return res.map(row => {
    return new PlaceResponse(row);
  });
};

const createOrder = async params => {
  const res = (await db.createOrder(params)).rows[0];
  return new OrderIdResponse(res.create_order);
};

const linkFlightWithOrderWithLuggage = async params => {
  await db.linkFlightWithOrderWithLuggage(params);
  return true;
};

const linkFlightWithOrder = async params => {
  await db.linkFlightWithOrder(params);
  return true;
};

const linkPlaceWithOrder = async params => {
  await db.linkPlaceWithOrder(params);
  return true;
};

const checkFlightLinkage = async ids => {
  const res = (await db.checkFlightLinkage(ids)).rows[0];
  return new CheckFlightLinkageResponse(res.check_flight_linkage);
};

const confirmOrder = async ({ orderId, }) => {
  await db.confirmOrder(orderId);
  return true;
};

const cancelOrder = async ({ orderId, }) => {
  await db.cancelOrder(orderId);
  return true;
};

const checkOrdersStatuses = async ({ flightIds, }) => {
  await db.checkOrdersStatuses(flightIds);
  return true;
};

const getUserByNickname = async ({ nickname, }) => {
  const user = (await db.getUserByNickname(nickname)).rows[0];
  return new UserResponse(user);
};

const changeNickname = async params => {
  await db.changeNickname(params);
  return true;
};

const getUserWithAvatar = async ({ id, }) => {
  const user = (await db.getUserWithAvatar(id)).rows[0];
  return new UserWithAvatarResponse(user);
};

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
  createOrder,
  linkFlightWithOrderWithLuggage,
  linkFlightWithOrder,
  linkPlaceWithOrder,
  checkFlightLinkage,
  confirmOrder,
  cancelOrder,
  checkOrdersStatuses,
  getUserByNickname,
  changeNickname,
  getUserWithAvatar,
};
