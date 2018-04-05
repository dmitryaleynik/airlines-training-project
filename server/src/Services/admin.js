const dbConnector = require('../Connectors/psql');

const { FlightsResponse, } = require('../Contracts/ServiceWithHandler/admin');
const {
  TypesPricesRequest,
} = require('../Contracts/ConnectorWithService/places');

const getFlights = async () => {
  const flights = await dbConnector.getAllFlights();
  for (let flight of flights) {
    flight.places = await dbConnector.getTypesPrices(
      new TypesPricesRequest(flight.id)
    );
  }
  return new FlightsResponse(flights);
};

module.exports = {
  getFlights,
};
