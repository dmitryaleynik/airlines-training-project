const dbConnector = require('../../Connectors/psql');
const { orderStatus, } = require('../../utils/constants');

const {
  PlaneSizesRequest,
  PlacesWithAvailabilityRequest,
  LinkPlaceWithOrderRequest,
  DeletePlaceBookingRequest,
  AddLuggageToBookingRequest,
} = require('../../Contracts/ConnectorWithService/places');
const {
  GetPlacesResponse,
  OrderIdResponse,
  AddToBookingResponse,
  BookPlaceResponse,
  AddLuggageToBookingResponse,
} = require('../../Contracts/ServiceWithHandler/placePicker');
const {
  NewOrderRequest,
  OrderByIdRequest,
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
  sizes.seats = seats;
  return new GetPlacesResponse(sizes);
};

const bookTemporarily = async ({ flightId, userId, }) => {
  const expirationTime = new Date(Date.now() + 15 * 60000);
  const orderId = (await dbConnector.createOrder(
    new NewOrderRequest(flightId, userId, expirationTime)
  )).id;
  await dbConnector.linkFlightWithOrder(
    new LinkFlightWithOrderRequest(flightId, orderId)
  );
  return new OrderIdResponse(orderId);
};

const addToBooking = async ({ orderId, flightId, }) => {
  const isLinked = (await dbConnector.checkFlightLinkage(
    new CheckFlightLinkageRequest(flightId, orderId)
  )).isLinked;
  if (isLinked) {
    return new AddToBookingResponse({ isLinked: true, });
  }
  await dbConnector.linkFlightWithOrder(
    new LinkFlightWithOrderRequest(flightId, orderId)
  );
  return true;
};

const bookPlace = async ({ orderId, flightId, placeId, }) => {
  const flightPlacesIds = await dbConnector.getPlacesWithAvailability(
    new PlacesWithAvailabilityRequest(flightId)
  );
  const place = flightPlacesIds.filter(place => place.id === placeId)[0];
  if (!place.isAvailable) {
    return new BookPlaceResponse({ placeIsBooked: true, });
  }

  await dbConnector.linkPlaceWithOrder(
    new LinkPlaceWithOrderRequest(placeId, flightId, orderId)
  );
  return true;
};

const deletePlaceBooking = async ({ orderId, flightId, placeId, }) => {
  await dbConnector.deletePlaceBooking(
    new DeletePlaceBookingRequest(orderId, flightId, placeId)
  );
  return true;
};

const addLuggageToBooking = async params => {
  const order = await dbConnector.getOrderById(
    new OrderByIdRequest(params.userId, params.orderId)
  );
  if (order.status !== orderStatus.PENDING) {
    return new AddLuggageToBookingResponse({ unavailableToProcess: true, });
  }
  await dbConnector.addLuggageToBooking(new AddLuggageToBookingRequest(params));
  return true;
};

module.exports = {
  getPlaces,
  bookTemporarily,
  addToBooking,
  bookPlace,
  deletePlaceBooking,
  addLuggageToBooking,
};
