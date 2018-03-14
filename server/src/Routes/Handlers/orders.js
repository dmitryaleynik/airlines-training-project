const HttpCodes = require('http-status-codes');
const ordersService = require('../../Services/orders');

const {
  OrdersByUserIdRequest,
  OrderByIdRequest,
} = require('../../Contracts/ServiceWithHandler/orders');

const getOrders = async ctx => {
  const { user, } = ctx.state;
  const res = await ordersService.getOrdersByUserId(
    new OrdersByUserIdRequest(user.id)
  );
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

const getOrderById = async ctx => {
  const { orderId, } = ctx.params;
  const res = await ordersService.getOrderById(
    new OrderByIdRequest(Number(orderId))
  );
  if (res.orderNotExist) {
    ctx.status = HttpCodes.BAD_REQUEST;
    ctx.body = {
      message: 'Order not found.',
    };
    return;
  }
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

module.exports = {
  getOrders,
  getOrderById,
};
