const Router = require('koa-router');
const profileRouter = require('./profile');
const regRouter = require('./registration');
const authRouter = require('./authorization');

const router = new Router();
router.use(profileRouter.routes());
router.use(regRouter.routes());
router.use(authRouter.routes());
router.all('*', async ctx => {
  ctx.status = 404;
  ctx.body = '404';
});

module.exports = router.routes();
