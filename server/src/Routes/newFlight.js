const Router = require('koa-router');
const passport = require('koa-passport');
const flightFinderHandler = require('./Handlers/newFlight/flightFinder');

const newFlightRouter = new Router();

newFlightRouter.get(
  '/cities',
  passport.authenticate('jwt', { session: false, }),
  flightFinderHandler.getAllCities
);

module.exports = newFlightRouter;
