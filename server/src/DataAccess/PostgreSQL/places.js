const client = require('./setup');

const getOrderedPlaces = async flight_id => {
  const queryText = 'SELECT * FROM get_ordered_places($1);';
  const values = [flight_id,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrderedPlaces,
};
