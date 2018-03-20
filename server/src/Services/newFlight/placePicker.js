const dbConnector = require('../../Connectors/psql');
const mapPlaces = require('../../utils/placesMapper');

const {
  PlaneSizesRequest,
  PlacesWithAvailabilityRequest,
  LinkPlaceWithOrderRequest,
} = require('../../Contracts/ConnectorWithService/places');
const {
  GetPlacesResponse,
  OrderIdResponse,
} = require('../../Contracts/ServiceWithHandler/placePicker');
const {
  NewOrderRequest,
} = require('../../Contracts/ConnectorWithService/orders');
const {
  LinkFlightWithOrderRequest,
} = require('../../Contracts/ConnectorWithService/flights');

const getPlaces = async ({ flightId, }) => {
  const sizes = await dbConnector.getPlaneSizes(
    new PlaneSizesRequest(flightId)
  );
  const seats = await dbConnector.getPlacesWithAvailability(
    new PlacesWithAvailabilityRequest(flightId)
  );
  sizes.seats = mapPlaces(seats);
  return new GetPlacesResponse(sizes);
};

const bookTemporarily = async ({ flightId, placeIds, luggageKg, userId, }) => {
  const orderId = (await dbConnector.createOrder(
    new NewOrderRequest(flightId, userId, new Date())
  )).id;
  if (luggageKg) {
    await dbConnector.linkFlightWithOrderWithLuggage(
      new LinkFlightWithOrderRequest(flightId, orderId, luggageKg)
    );
  } else {
    await dbConnector.linkFlightWithOrder(
      new LinkFlightWithOrderRequest(flightId, orderId)
    );
  }
  for (let placeId of placeIds) {
    await dbConnector.linkPlaceWithOrder(
      new LinkPlaceWithOrderRequest(placeId, flightId, orderId)
    );
  }
  return new OrderIdResponse(orderId);
};

module.exports = {
  getPlaces,
  bookTemporarily,
};
