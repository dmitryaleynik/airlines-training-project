const dbConnector = require('../Connectors/psql');

const {
  FlightsResponse,
  GetPlanesResponse,
  GetPlaneByIdResponse,
} = require('../Contracts/ServiceWithHandler/admin');
const {
  TypePricesRequest,
  TypeNamesRequest,
} = require('../Contracts/ConnectorWithService/places');
const {
  PlaneByIdRequest,
} = require('../Contracts/ConnectorWithService/planes');

const getFlights = async () => {
  const flights = await dbConnector.getAllFlights();
  for (let flight of flights) {
    flight.places = await dbConnector.getTypesPrices(
      new TypePricesRequest(flight.id)
    );
  }
  return new FlightsResponse(flights);
};

const getPlanes = async planeId => {
  if (planeId) {
    const plane = await dbConnector.getPlaneById(new PlaneByIdRequest(planeId));
    plane.places = (await dbConnector.getTypeNames(
      new TypeNamesRequest(plane.id)
    )).places;
    return new GetPlaneByIdResponse(plane);
  }

  const planes = await dbConnector.getPlanes();
  for (let plane of planes) {
    plane.places = (await dbConnector.getTypeNames(
      new TypeNamesRequest(plane.id)
    )).places;
  }
  return new GetPlanesResponse(planes);
};

module.exports = {
  getFlights,
  getPlanes,
};
