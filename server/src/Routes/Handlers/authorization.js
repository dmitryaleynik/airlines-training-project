const HttpCodes = require('http-status-codes');
const authService = require('../../Services/authorization');

const {
  AuthRequest,
} = require('../../Contracts/ServiceWithHandler/authorization');

const authHandler = async ctx => {
  const { body, } = ctx.request;
  const request = new AuthRequest(body.email, body.password);
  const response = await authService.authorize(request);
  if (response.userNotFound || response.wrongPassword) {
    ctx.status = HttpCodes.CONFLICT;
    ctx.body = {
      message: 'Authorization failed. Email or password are invalid.',
    };
    return;
  }
  ctx.status = HttpCodes.OK;
  ctx.body = response;
};

module.exports = authHandler;
