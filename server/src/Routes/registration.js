const Router = require('koa-router');
const regHandler = require('./Handlers/registration');

const RegRouter = new Router();

RegRouter.post('/sign-up', regHandler);

module.exports = RegRouter;
