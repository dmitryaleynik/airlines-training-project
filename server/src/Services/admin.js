const dbConnector = require('../Connectors/psql');

const {
  FlightsResponse,
  GetPlanesResponse,
  GetPlaneByIdResponse,
} = require('../Contracts/ServiceWithHandler/admin');
const {
  TypePricesRequest,
  TypeNamesRequest,
  AddTypePriceRequest,
} = require('../Contracts/ConnectorWithService/places');
const {
  PlaneByIdRequest,
} = require('../Contracts/ConnectorWithService/planes');
const {
  AddFlightRequest,
} = require('../Contracts/ConnectorWithService/flights');

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

const addNewFlight = async flightParams => {
  const flightId = (await dbConnector.addFlight(
    new AddFlightRequest(flightParams)
  )).id;
  for (const key in flightParams.places) {
    await dbConnector.addTypePrice(
      new AddTypePriceRequest(
        flightParams.planeId,
        flightId,
        key,
        flightParams.places[key]
      )
    );
  }
  return true;
};

module.exports = {
  getFlights,
  getPlanes,
  addNewFlight,
};
