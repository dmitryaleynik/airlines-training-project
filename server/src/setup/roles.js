const Roles = require('koa-roles');

const user = new Roles();

user.use('user access', async ctx => {
  return ctx.state.user.role === 'user';
});

user.use('admin access', async ctx => {
  return ctx.state.user.role === 'adimn';
});

module.exports = {
  Roles: user,
  access: {
    user: 'user access',
    admin: 'admin access',
  },
};
