const dbConnector = require('../Connectors/psql');
const mapPlaces = require('../utils/placesMapper');

const {
  OrdersByUserIdRequest,
  OrderByIdRequest,
} = require('../Contracts/ConnectorWithService/orders');
const {
  OrdersByUserIdResponse,
  OrderByIdResponse,
} = require('../Contracts/ServiceWithHandler/profile');
const {
  OrderedFlightRequest,
} = require('../Contracts/ConnectorWithService/flights');
const {
  OrderedPlacesRequest,
} = require('../Contracts/ConnectorWithService/places');

const getOrdersByUserId = async ({ id, }) => {
  const orders = await dbConnector.getOrdersByUserId(
    new OrdersByUserIdRequest(id)
  );
  return new OrdersByUserIdResponse(orders);
};

const getOrderById = async ({ userId, orderId, }) => {
  const order = await dbConnector.getOrderById(
    new OrderByIdRequest(userId, orderId)
  );
  if (!order.id) {
    return new OrderByIdResponse(null, { orderNotExist: true, });
  }
  const flights = await dbConnector.getOrderedFlights(
    new OrderedFlightRequest(order.id)
  );
  for (let flight of flights) {
    const places = await dbConnector.getOrderedPlaces(
      new OrderedPlacesRequest(flight.id, orderId)
    );
    flight.places = mapPlaces(places);
    if (!flight.luggage.kg) {
      flight.luggage.isRequired = false;
    } else {
      flight.luggage.paid =
        flight.luggage.kg > flight.luggage.free
          ? (flight.luggage.kg = flight.luggage.free)
          : 0;
    }
  }
  order.flights = flights;
  return new OrderByIdResponse(order);
};

module.exports = {
  getOrderById,
  getOrdersByUserId,
};
