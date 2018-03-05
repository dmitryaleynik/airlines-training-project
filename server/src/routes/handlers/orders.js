const ordersController = require('../../BusinessLayer/orders');

// get request, send response from BL
const getAllOrders = async (ctx) => {
  const res = await ordersController.getAllOrders();
  ctx.body = res;
};

module.exports = {
  getAllOrders,
}