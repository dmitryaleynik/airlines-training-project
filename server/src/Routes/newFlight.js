const Router = require('koa-router');
const passport = require('koa-passport');
const flightFinderHandler = require('./Handlers/newFlight/flightFinder');
const placePickerHandler = require('./Handlers/newFlight/placePicker');
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

newFlightRouter.get(
  '/places',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.getPlaces
);

newFlightRouter.post(
  '/orders/book/temp',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.bookTemporarily
);

newFlightRouter.put(
  '/orders/book/temp',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.addToBooking
);

module.exports = newFlightRouter;
