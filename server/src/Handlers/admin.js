const HttpCodes = require('http-status-codes');
const adminService = require('../Services/admin');

const { AddFlightRequest, } = require('../Contracts/ServiceWithHandler/admin');
const {
  FlightsResponse,
  Plane,
  PlaneShort,
} = require('../Contracts/Responses/admin');

const getFlights = async ctx => {
  const res = await adminService.getFlights();
  ctx.status = HttpCodes.OK;
  ctx.body = new FlightsResponse(res);
};

const getPlanesFull = async ctx => {
  const res = await adminService.getPlanes();
  res.planes = res.planes.map(plane => {
    return new Plane(plane);
  });
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

const getPlanesShort = async ctx => {
  const res = await adminService.getPlanes();
  res.planes = res.planes.map(plane => {
    return new PlaneShort(plane);
  });
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

const getPlaneById = async ctx => {
  const { id, } = ctx.params;
  if (!id) {
    ctx.status = HttpCodes.BAD_REQUEST;
    return;
  }

  const res = (await adminService.getPlanes(id)).plane;
  if (!res.id) {
    ctx.status = HttpCodes.NOT_FOUND;
    return;
  }

  ctx.status = HttpCodes.OK;
  ctx.body = new Plane(res);
};

const addNewFlight = async ctx => {
  const { body, } = ctx.request;
  const req = new AddFlightRequest(body);
  for (const key in req) {
    if (!req[key]) {
      ctx.status = HttpCodes.BAD_REQUEST;
      return;
    }
  }

  await adminService.addNewFlight(req);
  ctx.status = HttpCodes.FAILED_DEPENDENCY;
};

module.exports = {
  getFlights,
  getPlanesFull,
  getPlanesShort,
  addNewFlight,
  getPlaneById,
};
