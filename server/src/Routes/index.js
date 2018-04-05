const Router = require('koa-router');
const profileRouter = require('./profile');
const regRouter = require('./registration');
const authRouter = require('./authorization');
const newFlightRouter = require('./newFlight');
const bookingRouter = require('./booking');
const settingsRouter = require('./settings');
const adminRouter = require('./admin');

const router = new Router();
router.use(profileRouter.routes());
router.use(regRouter.routes());
router.use(authRouter.routes());
router.use(newFlightRouter.routes());
router.use(bookingRouter.routes());
router.use(settingsRouter.routes());
router.use(adminRouter.routes());

module.exports = router;
