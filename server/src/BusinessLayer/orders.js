const ordersConnector = require('../DataAccessLayer/orders');

// get request from handler, send it throw a contract, return processed response
const getAllOrders = async () => {
  const temp = await ordersConnector.getAllOrders();
  return temp;
}

module.exports = {
  getAllOrders,
}