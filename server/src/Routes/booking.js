const Router = require('koa-router');
const passport = require('koa-passport');
const placePickerHandler = require('../Handlers/newFlight/placePicker');
const { Roles, access, } = require('../setup/roles');
const confirmatorHandler = require('../Handlers/newFlight/confirmator');

const bookingRouter = new Router({
  prefix: '/booking',
});

bookingRouter.post(
  '/temp',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.bookTemporarily
);

bookingRouter.put(
  '/temp',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.addToBooking
);

bookingRouter.post(
  '/place',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.placeBooking
);

bookingRouter.delete(
  '/place',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.placeBooking
);

bookingRouter.put(
  '/confirm',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  confirmatorHandler.confirmBooking
);

bookingRouter.put(
  '/cancel',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  confirmatorHandler.cancelBooking
);

bookingRouter.put(
  '/luggage',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  placePickerHandler.addLuggageToBooking
);

module.exports = bookingRouter;
