const Router = require('koa-router');
const profileRouter = require('./profile');
const regRouter = require('./registration');
const authRouter = require('./authorization');
const newFlightRouter = require('./newFlight');

const router = new Router();
router.use(profileRouter.routes());
router.use(regRouter.routes());
router.use(authRouter.routes());
router.use(newFlightRouter.routes());
router.all('*', async ctx => {
  ctx.status = 404;
  ctx.body = '404';
});

module.exports = router.routes();
