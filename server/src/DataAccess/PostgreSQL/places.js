const client = require('./setup');

const getOrderedPlaces = async ({ flightId, orderId, }) => {
  const queryText = 'SELECT * FROM get_ordered_places($1, $2);';
  const values = [flightId, orderId,];
  const result = await client.query(queryText, values);
  return result;
};

const countAvailablePlaces = async ({ flightId, planeId, }) => {
  const queryText = 'SELECT * FROM count_places_by_type($1, $2);';
  const values = [planeId, flightId,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrderedPlaces,
  countAvailablePlaces,
};
