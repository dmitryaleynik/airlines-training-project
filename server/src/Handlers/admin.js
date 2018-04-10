const HttpCodes = require('http-status-codes');
const adminService = require('../Services/admin');

const { FlightsResponse, PlaneShort, } = require('../Contracts/Responses/admin');

const getFlights = async ctx => {
  const res = await adminService.getFlights();
  ctx.status = HttpCodes.OK;
  ctx.body = new FlightsResponse(res);
};

const getPlanesShort = async ctx => {
  const res = await adminService.getPlanes();
  res.planes = res.planes.map(plane => {
    return new PlaneShort(plane);
  });
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

module.exports = {
  getFlights,
  getPlanesShort,
};
