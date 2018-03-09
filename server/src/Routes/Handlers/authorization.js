const HttpCodes = require('http-status-codes');
const authService = require('../../Services/authorization');
const {
  AuthRequest,
} = require('../../Contracts/ServiceWithHandler/authorization');

const authHandler = async ctx => {
  try {
    const { body, } = ctx.request;
    const token = await authService.authorize(
      new AuthRequest(body.email, body.password)
    );
    ctx.status = HttpCodes.OK;
    ctx.body = token;
  } catch (error) {
    logger.log('error', error);
    switch (error.constructor.name) {
      case 'UserNotFoundException':
      case 'WrongPasswordException':
        ctx.status = HttpCodes.BAD_REQUEST;
        ctx.body = error.represent();
        return;
      default:
        throw error;
    }
  }
};

module.exports = authHandler;
