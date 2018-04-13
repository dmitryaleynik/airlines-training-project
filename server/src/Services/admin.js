const dbConnector = require('../Connectors/psql');
const preparePlaces = require('../utils/preparePlaces');

const {
  FlightsResponse,
  GetPlanesResponse,
  GetPlaneByIdResponse,
} = require('../Contracts/ServiceWithHandler/admin');
const {
  TypePricesRequest,
  TypeNamesRequest,
  AddTypePriceRequest,
  AddTypeRequest,
  AddPlaceRequest,
} = require('../Contracts/ConnectorWithService/places');
const {
  PlaneByIdRequest,
  AddPlaneRequest,
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

const addNewPlane = async ({ type, rows, columns, maxKg, types, }) => {
  const maxKgPerPlace = Math.round(maxKg / (rows * columns));
  const { planeId, } = await dbConnector.addPlane(
    new AddPlaneRequest(type, rows, columns, maxKgPerPlace)
  );
  for (let type of types) {
    const { typeId, } = await dbConnector.addTypeForPlane(
      new AddTypeRequest(planeId, type.name)
    );
    const places = preparePlaces(rows, type);
    for (let place of places) {
      await dbConnector.addPlaceForPlane(
        new AddPlaceRequest(planeId, typeId, place.number)
      );
    }
  }

  return true;
};

module.exports = {
  getFlights,
  getPlanes,
  addNewFlight,
  addNewPlane,
};
