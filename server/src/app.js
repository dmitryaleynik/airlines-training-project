require('dotenv').config();
require('./logger');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const RouterMiddleware = require('./Routes');

const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err.stack);
  }
});

app.use(RouterMiddleware);

app.listen(process.env.PORT, () => {
  logger.info(`Your server is alive on port ${process.env.PORT}.`);
});
