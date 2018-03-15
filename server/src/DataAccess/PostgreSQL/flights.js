const client = require('./setup');

const getOrderedFlights = async order_id => {
  const queryText = 'SELECT * FROM get_ordered_flights($1);';
  const values = [order_id,];
  const result = await client.query(queryText, values);
  return result;
};

const getAllCities = async () => {
  const queryText = 'SELECT * FROM get_all_cities();';
  const result = await client.query(queryText);
  return result;
};

module.exports = {
  getOrderedFlights,
  getAllCities,
};
