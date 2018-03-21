const HttpCodes = require('http-status-codes');
const confirmatorService = require('../../../Services/newFlight/confirmator');

const {
  ConfirmBookingRequest,
  CancelBookingRequest,
} = require('../../../Contracts/ServiceWithHandler/confirmator');

const confirmBooking = async ctx => {
  const { body, } = ctx.request;
  const { user, } = ctx.state;
  const res = await confirmatorService.confirmBooking(
    new ConfirmBookingRequest(body, user.id)
  );

  if (res.orderNotFound) {
    ctx.status = HttpCodes.NOT_FOUND;
    ctx.body = {
      message: 'Order is not found.',
    };
    return;
  }

  if (res.nothingToConfirm) {
    ctx.status = HttpCodes.NOT_MODIFIED;
    ctx.body = {
      message: 'Order has already been processed.',
    };
    return;
  }

  ctx.status = HttpCodes.OK;
};

const cancelBooking = async ctx => {
  const { body, } = ctx.request;
  const { user, } = ctx.state;
  const res = await confirmatorService.confirmBooking(
    new CancelBookingRequest(body, user.id)
  );

  if (res.orderNotFound) {
    ctx.status = HttpCodes.NOT_FOUND;
    ctx.body = {
      message: 'Order is not found.',
    };
    return;
  }

  if (res.nothingToConfirm) {
    ctx.status = HttpCodes.NOT_MODIFIED;
    ctx.body = {
      message: 'Order has already been processed.',
    };
    return;
  }

  ctx.status = HttpCodes.OK;
};

module.exports = {
  confirmBooking,
  cancelBooking,
};
