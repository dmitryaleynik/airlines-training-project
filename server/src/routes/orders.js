const Router = require('koa-router');
const { getAllOrders } = require('./handlers/orders');

const ordersRouter = new Router({
  prefix: '/orders'
});

ordersRouter.get('/', getAllOrders);

module.exports = ordersRouter;