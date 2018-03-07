const regService = require('../../Services/registration');
const HttpStatus = require('http-status-codes');
const {
  RegistrationRequest,
} = require('../../Contracts/ServiceWithHandler/registration');

const regHandler = async ctx => {
  try {
    const { body, } = ctx.request;
    const request = new RegistrationRequest(body.email, body.password);
    await regService.register(request);
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
