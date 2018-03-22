const Router = require('koa-router');
const passport = require('koa-passport');
const profileHandler = require('../Handlers/profile');
const { Roles, access, } = require('../setup/roles');

const profileRouter = new Router({
  prefix: '/orders',
});

profileRouter.get(
  '/',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  profileHandler.getOrders
);

profileRouter.get(
  '/:orderId',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  profileHandler.getOrderById
);

module.exports = profileRouter;
