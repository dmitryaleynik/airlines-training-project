const Router = require('koa-router');
const passport = require('koa-passport');
const ordersHandler = require('./Handlers/orders');

const ordersRouter = new Router({
  prefix: '/orders',
});

ordersRouter.get(
  '/',
  passport.authenticate('jwt', { session: false, }),
  ordersHandler.getOrders
);

ordersRouter.get(
  '/:orderId',
  passport.authenticate('jwt', { session: false, }),
  ordersHandler.getOrderById
);

module.exports = ordersRouter;
