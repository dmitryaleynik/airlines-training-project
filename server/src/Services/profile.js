const dbConnector = require('../Connectors/psql');

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

const getOrdersByUserId = async ({ id, }) => {
  const orders = await dbConnector.getOrdersByUserId(
    new OrdersByUserIdRequest(id)
  );
  return new OrdersByUserIdResponse(orders);
};

const getOrderById = async ({ id, }) => {
  const order = await dbConnector.getOrderById(new OrderByIdRequest(id));
  if (!order.id) {
    return new OrderByIdResponse(null, { orderNotExist: true, });
  }
  const flights = await dbConnector.getOrderedFlights(
    new OrderedFlightRequest(order.id)
  );
  for (let i = 0; i < flights.length; ++i) {
    const flight = flights[i];
    const places = await dbConnector.getOrderedPlaces({ id: flight.id, });
    const mappedPlaces = {};
    for (let j = 0; j < places.length; ++j) {
      const place = places[j];
      if (!mappedPlaces[place.type]) {
        mappedPlaces[place.type] = [];
      }
      mappedPlaces[place.type].push({
        id: place.id,
        number: place.number,
        price: place.price,
      });
    }
    flight.places = mappedPlaces;
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
