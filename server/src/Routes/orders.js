const Router = require('koa-router');
const ordersHandler = require('./Handlers/orders');

const ordersRouter = new Router({
  prefix: '/orders',
});

ordersRouter.get('/', ordersHandler.getAllOrders);

module.exports = ordersRouter;
