const dbConnector = require('../Connectors/psql');
const mapPlaces = require('../utils/placesMapper');
const mapLuggage = require('../utils/luggageMapper');
const { orderStatus, } = require('../utils/constants');

const {
  OrdersByUserIdRequest,
  OrderByIdRequest,
  CancelOrderRequest,
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

  const curDate = new Date();
  for (let order of orders) {
    if (order.expiresAt < curDate) {
      await dbConnector.cancelOrder(new CancelOrderRequest(order.id));
      order.status = orderStatus.CANCELLED;
    }
  }
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
    flight.luggage = mapLuggage(places, flight.luggage);
  }
  order.flights = flights;

  const curDate = new Date();
  if (order.expiresAt < curDate) {
    await dbConnector.cancelOrder(new CancelOrderRequest(order.id));
    order.status = orderStatus.CANCELLED;
  }
  return new OrderByIdResponse(order);
};

module.exports = {
  getOrderById,
  getOrdersByUserId,
};
