const HttpCodes = require('http-status-codes');
const adminService = require('../Services/admin');

const { FlightsResponse, } = require('../Contracts/Responses/admin');

const getFlights = async ctx => {
  const res = await adminService.getFlights();
  ctx.status = HttpCodes.OK;
  ctx.body = new FlightsResponse(res);
};

module.exports = {
  getFlights,
};
