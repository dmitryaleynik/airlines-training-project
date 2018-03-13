const HttpCodes = require('http-status-codes');
const authService = require('../../Services/authorization');
const fetchResponse = require('../../utils/response');

const {
  AuthRequest,
} = require('../../Contracts/ServiceWithHandler/authorization');

const authHandler = async ctx => {
  const { body, } = ctx.request;
  const request = new AuthRequest(body.email, body.password);
  const response = await authService.authorize(request);
  if (response.userNotFound) {
    fetchResponse(
      ctx,
      HttpCodes.CONFLICT,
      'Authorization failed. User not found.'
    );
    return;
  }
  if (response.wrongPassword) {
    fetchResponse(
      ctx,
      HttpCodes.CONFLICT,
      'Authorization failed. Wrong password.'
    );
    return;
  }
  fetchResponse(ctx, HttpCodes.OK, response);
};

module.exports = authHandler;
