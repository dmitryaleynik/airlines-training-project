const Router = require('koa-router');
const ordersRouter = require('./orders');
const regRouter = require('./registration');

const router = new Router();
router.use(ordersRouter.routes());
router.use(regRouter.routes());
router.all('*', async ctx => {
  ctx.status = 404;
  ctx.body = '404';
});

module.exports = router.routes();
