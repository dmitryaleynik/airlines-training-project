const ordersConnector = require('../Connectors/psql');
const Order = require('../Contracts/ServiceToHandler/Order');

const getAllOrders = async () => {
  const orders = await ordersConnector.getAllOrders();
  return orders.map(order => {
    return new Order(order);
  })
}

module.exports = {
  getAllOrders,
}