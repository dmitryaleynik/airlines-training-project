const Router = require('koa-router');
const authHandler = require('../Handlers/authorization');

const authRouter = new Router();

authRouter.post('/sign-in', authHandler.authorizeUser);

authRouter.post('/admin/sign-in', authHandler.authorizeAdmin);

module.exports = authRouter;
