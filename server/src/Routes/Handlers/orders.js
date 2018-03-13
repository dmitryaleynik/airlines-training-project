const ordersService = require('../../Services/orders');

const getAllOrders = async ctx => {
  // const res = await ordersService.getAllOrders();
  ctx.body = 'cool';
};

module.exports = {
  getAllOrders,
};
