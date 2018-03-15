const HttpCodes = require('http-status-codes');
const flightFinderService = require('../../../Services/newFlight/flightFinder');

const {
  GetAllCitiesResponse,
} = require('../../../Contracts/Responses/flightFinder');

const getAllCities = async ctx => {
  const res = await flightFinderService.getAllCities();
  ctx.status = HttpCodes.OK;
  ctx.body = new GetAllCitiesResponse(res);
  return;
};

module.exports = {
  getAllCities,
};
