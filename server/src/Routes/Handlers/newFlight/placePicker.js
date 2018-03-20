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
    ctx.body = { message: 'Invalid query.', };
    return;
  }

  const res = await placePickerService.getPlaces(
    new GetPlacesRequest(flight_id)
  );
  ctx.status = HttpCodes.OK;
  ctx.body = new GetPlacesResponse(res);
};

const bookTemporarily = async ctx => {
  const res = await placePickerService.bookTemporarily(
    new BookTemporarilyRequest(ctx.request.body, ctx.state.user.id)
  );
  ctx.status = HttpCodes.CREATED;
  ctx.body = new OrderIdResponse(res);
};

const addToBooking = async ctx => {
  const res = await placePickerService.addToBooking(
    new AddToBookingRequest(ctx.request.body)
  );
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
