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
  '/planes/full',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.getPlanesFull
);

adminRouter.get(
  '/planes/short',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.getPlanesShort
);

adminRouter.get(
  '/planes/:id',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.getPlaneById
);

adminRouter.post(
  '/flights/add',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.admin),
  adminHandler.addNewFlight
);

module.exports = adminRouter;
