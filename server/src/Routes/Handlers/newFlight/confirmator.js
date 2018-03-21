const HttpCodes = require('http-status-codes');
const confirmatorService = require('../../../Services/newFlight/confirmator');

const {
  ConfirmBookingRequest,
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
    return;
  }

  ctx.body = 'sosatt';
};

module.exports = {
  confirmBooking,
};
