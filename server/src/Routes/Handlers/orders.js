const HttpCodes = require('http-status-codes');
const ordersService = require('../../Services/orders');

const {
  OrdersByIdRequest,
} = require('../../Contracts/ServiceWithHandler/orders');

const getOrders = async ctx => {
  const { user, } = ctx.state;
  const res = await ordersService.getOrdersByUserId(
    new OrdersByIdRequest(user.id)
  );
  ctx.status = HttpCodes.OK;
  ctx.body = res;
};

module.exports = {
  getOrders,
};
