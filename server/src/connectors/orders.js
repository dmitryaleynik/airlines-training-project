const orders = require('../db/orders');

const getAllOrders = async () => {
  const res = await orders.getAllOrders();
  console.log(res);
  return res;
}

module.exports = {
  getAllOrders
}