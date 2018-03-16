const Router = require('koa-router');
const passport = require('koa-passport');
const flightFinderHandler = require('./Handlers/newFlight/flightFinder');
const { Roles, access, } = require('../setup/roles');

const newFlightRouter = new Router();

newFlightRouter.get(
  '/cities',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  flightFinderHandler.getAllCities
);

newFlightRouter.get(
  '/flights',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  flightFinderHandler.getFlights
);

module.exports = newFlightRouter;
