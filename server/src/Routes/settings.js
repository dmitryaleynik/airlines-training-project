const Router = require('koa-router');
const passport = require('koa-passport');
const { Roles, access, } = require('../setup/roles');
const settingsHandler = require('./Handlers/settings');

const settingsRouter = new Router({ prefix: '/settings', });

settingsRouter.put(
  '/nickname',
  passport.authenticate('jwt', { session: false, }),
  Roles.can(access.user),
  settingsHandler.changeNickname
);

module.exports = settingsRouter;
