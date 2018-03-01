const ordersController = require('../../controllers/orders');

const getAllOrders = async (ctx) => {
  const res = await ordersController.getAllOrders();
  ctx.body = res.rows;
};

module.exports = {
  getAllOrders,
}