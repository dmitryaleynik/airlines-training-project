const Router = require('koa-router');
const ordersRouter = require('./orders');

const router = new Router();
router.use(ordersRouter.routes());
router.all('*', async (ctx) => {
  ctx.status = 404;
  ctx.body = '404';
})

module.exports = router.routes();