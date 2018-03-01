const ordersDb = require('../db/orders');

const getAllOrders = async () => {
  const res = await ordersDb.getAllOrders();
  return res;
}

module.exports = {
  getAllOrders
}