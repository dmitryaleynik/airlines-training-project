const dbConnector = require('../Connectors/psql');

const {
  FlightsResponse,
  GetPlanesResponse,
} = require('../Contracts/ServiceWithHandler/admin');
const {
  TypePricesRequest,
  TypeNamesRequest,
} = require('../Contracts/ConnectorWithService/places');

const getFlights = async () => {
  const flights = await dbConnector.getAllFlights();
  for (let flight of flights) {
    flight.places = await dbConnector.getTypesPrices(
      new TypePricesRequest(flight.id)
    );
  }
  return new FlightsResponse(flights);
};

const getPlanes = async () => {
  const planes = await dbConnector.getPlanes();
  for (let plane of planes) {
    plane.places = await dbConnector.getTypeNames(
      new TypeNamesRequest(plane.id)
    );
  }
  return new GetPlanesResponse(planes);
};

module.exports = {
  getFlights,
  getPlanes,
};
