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

const getFlightsByFilters = async ({
  cityFrom,
  cityTo,
  dateFrom,
  dateTo,
  seats,
}) => {
  const queryText = 'SELECT * FROM get_flights_by_filters($1, $2, $3, $4, $5);';
  const values = [cityFrom, cityTo, dateFrom, dateTo, seats,];
  const result = await client.query(queryText, values);
  return result;
};

module.exports = {
  getOrderedFlights,
  getAllCities,
  getFlightsByFilters,
};
