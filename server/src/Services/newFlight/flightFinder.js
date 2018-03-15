const dbConnector = require('../../Connectors/psql');

const {
  GetAllCitiesResponse,
} = require('../../Contracts/ServiceWithHandler/flightFinder');

const getAllCities = async () => {
  const res = await dbConnector.getAllCities();
  return new GetAllCitiesResponse(res);
};

module.exports = {
  getAllCities,
};
