const client = require('./setup');

const getOrderedPlaces = async flight_id => {
  const queryText = 'SELECT * FROM get_ordered_places($1);';
  const values = [flight_id,];
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
