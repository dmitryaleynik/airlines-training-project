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
  AddToBookingResponse,
} = require('../../Contracts/ServiceWithHandler/placePicker');
const {
  NewOrderRequest,
} = require('../../Contracts/ConnectorWithService/orders');
const {
  LinkFlightWithOrderRequest,
  CheckFlightLinkageRequest,
} = require('../../Contracts/ConnectorWithService/flights');

const getPlaces = async ({ flightId, }) => {
  const sizes = await dbConnector.getPlaneSizes(
    new PlaneSizesRequest(flightId)
  );
  if (!sizes.rows) {
    return new GetPlacesResponse({ flightNotFound: true, });
  }
  const seats = await dbConnector.getPlacesWithAvailability(
    new PlacesWithAvailabilityRequest(flightId)
  );
  sizes.seats = mapPlaces(seats);
  return new GetPlacesResponse(sizes);
};

const bookTemporarily = async ({ flightId, placeIds, luggageKg, userId, }) => {
  const expirationTime = new Date(Date.now() + 15 * 60000);
  const orderId = (await dbConnector.createOrder(
    new NewOrderRequest(flightId, userId, expirationTime)
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

const addToBooking = async ({ orderId, flightId, placeIds, luggageKg, }) => {
  const isLinked = (await dbConnector.checkFlightLinkage(
    new CheckFlightLinkageRequest(flightId, orderId)
  )).isLinked;
  if (isLinked) {
    return new AddToBookingResponse({ isLinked: true, });
  }
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
  return true;
};

module.exports = {
  getPlaces,
  bookTemporarily,
  addToBooking,
};
