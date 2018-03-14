const Router = require('koa-router');
const passport = require('koa-passport');
const profileHandler = require('./Handlers/profile');

const profileRouter = new Router({
  prefix: '/orders',
});

profileRouter.get(
  '/',
  passport.authenticate('jwt', { session: false, }),
  profileHandler.getOrders
);

profileRouter.get(
  '/:orderId',
  passport.authenticate('jwt', { session: false, }),
  profileHandler.getOrderById
);

module.exports = profileRouter;
