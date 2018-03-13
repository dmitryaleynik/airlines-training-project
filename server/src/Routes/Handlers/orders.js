const passport = require('koa-passport');
const { authenticatePromise, } = require('../../utils/promises');
const ordersService = require('../../Services/orders');

const getAllOrders = async ctx => {
  await authenticatePromise(ctx);
  const res = await ordersService.getAllOrders();
};

module.exports = {
  getAllOrders,
};
