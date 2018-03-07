require('dotenv').config();
require('./setup/logger');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const HttpCodes = require('http-status-codes');
const RouterMiddleware = require('./Routes');

const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error.stack);
    ctx.status = HttpCodes.INTERNAL_SERVER_ERROR;
    ctx.body = {
      id: error.code || 'Internal server error',
      description: error.message || 'Internal server error',
    };
  }
});

app.use(RouterMiddleware);

app.listen(process.env.PORT, () => {
  logger.info(`Your server is alive on port ${process.env.PORT}.`);
});
