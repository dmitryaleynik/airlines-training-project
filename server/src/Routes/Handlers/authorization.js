const authService = require('../../Services/authorization');
const {
  AuthRequest,
} = require('../../Contracts/ServiceWithHandler/authorization');

const authHandler = async ctx => {
  const { body, } = ctx.request;
  const token = await authService.authorize(
    new AuthRequest(body.email, body.password)
  );
  ctx.body = token;
};

module.exports = authHandler;
