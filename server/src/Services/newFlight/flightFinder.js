const dbConnector = require('../../Connectors/psql');

const {
  GetAllCitiesResponse,
  GetFlightsResponse,
} = require('../../Contracts/ServiceWithHandler/flightFinder');
const {
  FlightByFiltersRequest,
} = require('../../Contracts/ConnectorWithService/flights');
const {
  AvailablePlacesStatisticsRequest,
} = require('../../Contracts/ConnectorWithService/places');

const getAllCities = async () => {
  const res = await dbConnector.getAllCities();
  return new GetAllCitiesResponse(res);
};

const getFlights = async filters => {
  const flights = await dbConnector.getFlightsByFilters(
    new FlightByFiltersRequest(filters)
  );
  for (let flight of flights) {
    const placesStat = await dbConnector.countAvailablePlaces(
      new AvailablePlacesStatisticsRequest(flight.planeId, flight.id)
    );
    const mappedStat = {};
    for (let stat of placesStat) {
      mappedStat[stat.type] = {
        amount: stat.amount,
        price: stat.price,
      };
    }
    flight.places = mappedStat;
  }
  return new GetFlightsResponse(flights);
};

module.exports = {
  getAllCities,
  getFlights,
};
