const ordersConnector = require('../connectors/orders');

const getAllOrders = async (ctx) => {
  const res = await ordersConnector.getAllOrders();
  ctx.body = res.rows;
};

module.exports = {
  getAllOrders,
}