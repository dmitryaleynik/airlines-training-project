const client = require('./setup');

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

module.exports = {
  getOrderedPlaces,
  countAvailablePlaces,
  getPlaneSizes,
  getPlacesWithAvailability,
};
