const HttpCodes = require('http-status-codes');
const ordersService = require('../../Services/profile');

const {
  OrdersByUserIdRequest,
  OrderByIdRequest,
} = require('../../Contracts/ServiceWithHandler/profile');
const {
  GetOrdersResponse,
  GetOrderByIdResponse,
} = require('../../Contracts/Responses/profile');

const getOrders = async ctx => {
  const { user, } = ctx.state;
  const res = await ordersService.getOrdersByUserId(
    new OrdersByUserIdRequest(user.id)
  );
  ctx.status = HttpCodes.OK;
  ctx.body = new GetOrdersResponse(res);
};

const getOrderById = async ctx => {
  const { orderId, } = ctx.params;
  const { user, } = ctx.state;
  const res = await ordersService.getOrderById(
    new OrderByIdRequest(user.id, Number(orderId))
  );
  if (res.orderNotExist) {
    ctx.status = HttpCodes.NOT_FOUND;
    ctx.body = {
      message: 'Order not found.',
    };
    return;
  }
  ctx.status = HttpCodes.OK;
  ctx.body = new GetOrderByIdResponse(res);
};

module.exports = {
  getOrders,
  getOrderById,
};
