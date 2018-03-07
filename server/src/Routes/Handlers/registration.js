const regService = require('../../Services/registration');
const HttpStatus = require('http-status-codes');

const regHandler = async ctx => {
  try {
    await regService.register(ctx.request.body);
    ctx.status = HttpStatus.CREATED;
    return;
  } catch (error) {
    logger.log('error', error.stack);
    switch (error.constructor.name) {
      case 'EmailUsedException':
        ctx.status = HttpStatus.CONFLICT;
        ctx.body = error.represent();
        return;
      default:
        throw error;
    }
  }
};

module.exports = regHandler;
