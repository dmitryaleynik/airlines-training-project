const HttpCodes = require('http-status-codes');
const flightFinderService = require('../../../Services/newFlight/flightFinder');

const {
  GetFlightsRequest,
} = require('../../../Contracts/ServiceWithHandler/flightFinder');
const {
  GetAllCitiesResponse,
  GetFlightsResponse,
} = require('../../../Contracts/Responses/flightFinder');

const getAllCities = async ctx => {
  const res = await flightFinderService.getAllCities();
  ctx.status = HttpCodes.OK;
  ctx.body = new GetAllCitiesResponse(res);
  return;
};

const getFlights = async ctx => {
  const validateQuery = query => {
    const schema = ['city_from', 'city_to', 'date_from', 'date_to', 'seats',];
    for (let sch of schema) {
      if (query[sch] === undefined) {
        return false;
      }
    }
    return true;
  };
  const filters = ctx.query;
  if (!validateQuery(filters)) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = { message: 'Search failed. Invalid query.', };
    return;
  }
  const req = new GetFlightsRequest(filters);
  const res = await flightFinderService.getFlights(req);

  ctx.status = HttpCodes.OK;
  ctx.body = new GetFlightsResponse(res);
};

module.exports = {
  getAllCities,
  getFlights,
};
