const Roles = require('koa-roles');
const { roles, } = require('../utils/constants');

const user = new Roles();

user.use('user access', async ctx => {
  return ctx.state.user.role === roles.USER;
});

user.use('admin access', async ctx => {
  return ctx.state.user.role === roles.ADMIN;
});

module.exports = {
  Roles: user,
  access: {
    user: 'user access',
    admin: 'admin access',
  },
};
