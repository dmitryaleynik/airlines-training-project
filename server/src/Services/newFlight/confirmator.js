const dbConnector = require('../../Connectors/psql');
const { orderStatus, } = require('../../utils/constants');

const {
  ConfirmOrderRequest,
  CancelOrderRequest,
  OrderByIdRequest,
} = require('../../Contracts/ConnectorWithService/orders');
const {
  ConfirmBookingResponse,
  CancelBookingResponse,
} = require('../../Contracts/ServiceWithHandler/confirmator');

const confirmBooking = async ({ orderId, userId, }) => {
  const order = await dbConnector.getOrderById(
    new OrderByIdRequest(userId, orderId)
  );
  if (!order.id) {
    return new ConfirmBookingResponse({ orderNotFound: true, });
  }
  if (
    order.status === orderStatus.CONFIRMED ||
    order.status === orderStatus.CANCELLED
  ) {
    return new ConfirmBookingResponse({ nothingToConfirm: true, });
  }
  await dbConnector.confirmOrder(new ConfirmOrderRequest(order.id));
  return true;
};

const cancelBooking = async ({ orderId, userId, }) => {
  const order = await dbConnector.getOrderById(
    new OrderByIdRequest(userId, orderId)
  );
  if (!order.id) {
    return new CancelBookingResponse({ orderNotFound: true, });
  }
  if (
    order.status === orderStatus.CONFIRMED ||
    order.status === orderStatus.CANCELLED
  ) {
    return new CancelBookingResponse({ nothingToConfirm: true, });
  }
  await dbConnector.cancelOrder(new CancelOrderRequest(order.id));
  return true;
};

module.exports = {
  confirmBooking,
  cancelBooking,
};
