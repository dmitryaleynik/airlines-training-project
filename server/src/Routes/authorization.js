const Router = require('koa-router');
const authHandler = require('./Handlers/authorization');

const authRouter = new Router();

authRouter.post('/sign-in', authHandler);

module.exports = authRouter;
