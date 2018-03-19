const dbConnector = require('../../Connectors/psql');
const mapPlaces = require('../../utils/placesMapper');

const {
  PlaneSizesRequest,
  PlacesWithAvailabilityRequest,
} = require('../../Contracts/ConnectorWithService/places');
const {
  GetPlacesResponse,
} = require('../../Contracts/ServiceWithHandler/placePicker');

const getPlaces = async ({ flightId, }) => {
  const sizes = await dbConnector.getPlaneSizes(
    new PlaneSizesRequest(flightId)
  );
  const seats = await dbConnector.getPlacesWithAvailability(
    new PlacesWithAvailabilityRequest(flightId)
  );
  sizes.seats = mapPlaces(seats);
  return new GetPlacesResponse(sizes);
};

module.exports = {
  getPlaces,
};
