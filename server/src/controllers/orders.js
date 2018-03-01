const ordersConnector = require('../connectors/orders');

const getAllOrders = async () => {
  return await ordersConnector.getAllOrders();
}

module.exports = {
  getAllOrders,
}