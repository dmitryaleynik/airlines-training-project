const HttpCodes = require('http-status-codes');
const placePickerService = require('../../../Services/newFlight/placePicker');

const {
  GetPlacesRequest,
  BookTemporarilyRequest,
  AddToBookingRequest,
} = require('../../../Contracts/ServiceWithHandler/placePicker');
const {
  GetPlacesResponse,
  OrderIdResponse,
} = require('../../../Contracts/Responses/placePicker');

const getPlaces = async ctx => {
  const { flight_id, } = ctx.query;

  if (flight_id === undefined) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = { message: 'Invalid query. flight_id parameter is required.', };
    return;
  }

  const res = await placePickerService.getPlaces(
    new GetPlacesRequest(flight_id)
  );
  if (res.flightNotFound) {
    ctx.status = HttpCodes.NOT_FOUND;
    ctx.body = {
      message: 'Can\'t get places. Flight is not found.',
    };
    return;
  }
  ctx.status = HttpCodes.OK;
  ctx.body = new GetPlacesResponse(res);
};

const bookTemporarily = async ctx => {
  const { body, } = ctx.request;
  const req = new BookTemporarilyRequest(body, ctx.state.user.id);
  for (let key in req) {
    if (req[key] === undefined) {
      ctx.status = HttpCodes.BAD_REQUEST;
      ctx.body = {
        message: `Invalid body. ${key} is required.`,
      };
      return;
    }
  }
  if (!req.placeIds.length) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Invalid body. You must pick at least one place.',
    };
  }

  const res = await placePickerService.bookTemporarily(req);
  ctx.status = HttpCodes.CREATED;
  ctx.body = new OrderIdResponse(res);
};

const addToBooking = async ctx => {
  const { body, } = ctx.request;
  const req = new AddToBookingRequest(body);

  for (let key in req) {
    if (req[key] === undefined) {
      ctx.status = HttpCodes.BAD_REQUEST;
      ctx.body = {
        message: `Invalid body. ${key} is required.`,
      };
      return;
    }
  }
  if (!req.placeIds.length) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Invalid body. You must pick at least one place.',
    };
  }

  const res = await placePickerService.addToBooking(req);
  if (res.isLinked) {
    ctx.status = HttpCodes.NOT_MODIFIED;
    return;
  }
  ctx.status = HttpCodes.NO_CONTENT;
};

module.exports = {
  getPlaces,
  bookTemporarily,
  addToBooking,
};
