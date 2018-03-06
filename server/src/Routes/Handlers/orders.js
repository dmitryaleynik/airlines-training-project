const ordersService = require('../../Services/orders');

// get request, send response from BL
const getAllOrders = async ctx => {
  const res = await ordersService.getAllOrders();
  ctx.body = res;
};

module.exports = {
  getAllOrders,
};
