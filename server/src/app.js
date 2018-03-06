require('dotenv').config();
require('./logger');
const Koa = require('koa');
const RouterMiddleware = require('./Routes');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.log(12345, err);
  }
});

app.use(RouterMiddleware);

app.listen(process.env.PORT, () => {
  logger.info(`Your server is alive on port ${process.env.PORT}.`);
});
