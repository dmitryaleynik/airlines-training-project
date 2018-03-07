const dbConnector = require('../Connectors/psql');
const Order = require('../Contracts/ServiceWithHandler/Order');

const getAllOrders = async () => {
  const orders = await dbConnector.getAllOrders();
  return orders.map(order => {
    return new Order(order);
  });
};

module.exports = {
  getAllOrders,
};
