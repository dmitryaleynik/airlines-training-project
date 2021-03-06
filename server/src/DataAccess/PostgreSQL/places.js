const client = require('./setup');
const Request = require('./Request');

const getOrderedPlaces = async ({ flightId, orderId, }) => {
  const queryText = 'SELECT * FROM get_ordered_places($1, $2);';
  const values = [flightId, orderId,];
  const result = await client.query(queryText, values);
  return result;
};

const countAvailablePlaces = async flightId => {
  const queryText = 'SELECT * FROM count_places_by_type($1);';
  const values = [flightId,];
  const result = await client.query(queryText, values);
  return result;
};

const getPlaneSizes = async flightId => {
  const queryText = 'SELECT * FROM get_plane_sizes($1);';
  const values = [flightId,];
  const result = await client.query(queryText, values);
  return result;
};

const getPlacesWithAvailability = async flightId => {
  const queryText = 'SELECT * FROM get_places_with_availability($1);';
  const values = [flightId,];
  const result = await client.query(queryText, values);
  return result;
};

const linkPlaceWithOrder = async ({ placeId, flightId, orderId, }) => {
  const queryText = 'SELECT * FROM link_place_with_order($1, $2, $3);';
  const values = [placeId, flightId, orderId,];
  const result = await client.query(queryText, values);
  return result;
};

const deletePlaceBooking = async ({ placeId, flightId, orderId, }) => {
  const queryText = 'SELECT * FROM delete_place_booking($1, $2, $3);';
  const values = [orderId, flightId, placeId,];
  const result = await client.query(queryText, values);
  return result;
};

const addLuggageToBooking = async ({ luggageKg, flightId, orderId, }) => {
  const queryText = 'SELECT * FROM add_luggage_to_booking($1, $2, $3);';
  const values = [orderId, flightId, luggageKg,];
  const result = await client.query(queryText, values);
  return result;
};

const getTypesPrices = async flightId => {
  return await new Request(
    'SELECT * FROM get_types_prices($1)',
    flightId
  ).send();
};

const getTypeNames = async planeId => {
  return await new Request(
    'SELECT * FROM get_place_type_names($1)',
    planeId
  ).send();
};

const addTypePrice = async ({ flightId, planeId, type, price, }) => {
  return await new Request(
    'SELECT * FROM add_type_price($1, $2, $3, $4)',
    flightId,
    planeId,
    type,
    price
  ).send();
};

const addTypeForPlane = async ({ planeId, typeName, }) => {
  return await new Request(
    'SELECT * FROM add_type_for_plane($1, $2) as type_id',
    planeId,
    typeName
  ).send();
};

const addPlaceForPlane = async ({ planeId, typeId, number, }) => {
  return await new Request(
    'SELECT * FROM add_place_for_plane($1, $2, $3)',
    planeId,
    typeId,
    number
  ).send();
};

module.exports = {
  getOrderedPlaces,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
  linkPlaceWithOrder,
  deletePlaceBooking,
  addLuggageToBooking,
  getTypesPrices,
  getTypeNames,
  addTypePrice,
  addTypeForPlane,
  addPlaceForPlane,
};
