const db = require('../DataAccess/PostgreSQL');

const { OrderResponse, } = require('../Contracts/ConnectorWithService/orders');
const {
  UserResponse,
  PasswordDataResponse,
} = require('../Contracts/ConnectorWithService/users');
const {
  FlightResponse,
  CitiesResponse,
} = require('../Contracts/ConnectorWithService/flights');
const {
  PlaceResponse,
  AvailablePlacesStatisticsResponse,
} = require('../Contracts/ConnectorWithService/places');

const getOrdersByUserId = async ({ id, }) => {
  const ordersToBeMapped = (await db.getOrdersByUserId(id)).rows;
  return ordersToBeMapped.map(order => {
    return new OrderResponse(order);
  });
};

const getOrderById = async ({ id, }) => {
  const result = (await db.getOrderById(id)).rows[0];
  return new OrderResponse(result);
};

const getOrderedFlights = async ({ id, }) => {
  const flightsToBeMapped = (await db.getOrderedFlights(id)).rows;
  return flightsToBeMapped.map(flight => {
    return new FlightResponse(flight);
  });
};

const getOrderedPlaces = async ({ id, }) => {
  const placesToBeMapped = (await db.getOrderedPlaces(id)).rows;
  return placesToBeMapped.map(place => {
    return new PlaceResponse(place);
  });
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

const countAvailablePlaces = async ids => {
  const stat = (await db.countAvailablePlaces(ids)).rows;
  return stat.map(row => {
    return new AvailablePlacesStatisticsResponse(row);
  });
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
};
