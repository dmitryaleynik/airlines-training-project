require('dotenv').config();
require('./setup/logger');
require('./strategies/jwt');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const HttpCodes = require('http-status-codes');
const RouterMiddleware = require('./Routes');
const { Roles, } = require('./setup/roles');

const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error.stack);
    ctx.status = HttpCodes.INTERNAL_SERVER_ERROR;
    ctx.body = {
      timestamp: new Date().toUTCString(),
      message: error.message || 'Internal server error',
    };
  }
});
app.use(passport.initialize());
app.use(Roles.middleware());
app.use(RouterMiddleware.routes());
app.use(RouterMiddleware.allowedMethods());

app.listen(process.env.PORT, () => {
  logger.info(`Your server is alive on port ${process.env.PORT}.`);
});
