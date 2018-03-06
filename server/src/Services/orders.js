const dbConnector = require('../Connectors/psql');
const Order = require('../Contracts/ServiceToHandler/Order');

const getAllOrders = async () => {
  const orders = await dbConnector.getAllOrders();
  return orders.map(order => {
    return new Order(order);
  });
};

module.exports = {
  getAllOrders,
};
