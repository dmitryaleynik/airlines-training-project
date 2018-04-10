const Router = require('koa-router');
const passport = require('koa-passport');
const { Roles, access, } = require('../setup/roles');
const adminHandler = require('../Handlers/admin');

const adminRouter = new Router({
  prefix: '/admin',
});

adminRouter.get(
  '/flights',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.getFlights
);

adminRouter.get(
  '/planes/short',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.getPlanesShort
);

module.exports = adminRouter;
