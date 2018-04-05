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

module.exports = {
  getOrderedPlaces,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
  linkPlaceWithOrder,
  deletePlaceBooking,
  addLuggageToBooking,
  getTypesPrices,
};
