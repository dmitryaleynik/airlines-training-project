const HttpCodes = require('http-status-codes');
const authService = require('../Services/authorization');
const { roles, } = require('../utils/constants');

const {
  AuthRequest,
} = require('../Contracts/ServiceWithHandler/authorization');
const { AuthResponse, } = require('../Contracts/Responses/authorization');

const authorizeUser = async ctx => {
  return await authorize(ctx, roles.USER);
};

const authorizeAdmin = async ctx => {
  return await authorize(ctx, roles.ADMIN);
};

const authorize = async (ctx, role) => {
  const { email, password, } = ctx.request.body;
  if (!email || !password) {
    ctx.status = HttpCodes.BAD_REQUEST;
    return;
  }
  const request = new AuthRequest(email, password, role);
  const response = await authService.authorize(request);
  if (
    response.userNotFound ||
    response.wrongPassword ||
    response.unsuitableRole
  ) {
    ctx.status = HttpCodes.CONFLICT;
    ctx.body = {
      message: 'Authorization failed. Email or password are invalid.',
    };
    return;
  }
  ctx.status = HttpCodes.OK;
  ctx.body = new AuthResponse(response);
};

module.exports = {
  authorizeUser,
  authorizeAdmin,
};
