const HttpStatus = require('http-status-codes');
const regService = require('../../Services/registration');

const {
  RegistrationRequest,
} = require('../../Contracts/ServiceWithHandler/registration');

const regHandler = async ctx => {
  const { body, } = ctx.request;
  const request = new RegistrationRequest(body.email, body.password);
  const response = await regService.register(request);
  if (response.emailUsed) {
    ctx.status = HttpStatus.CONFLICT;
    ctx.body = {
      message: 'Registration failed. Email is already used.',
    };
    return;
  }
  ctx.status = HttpStatus.CREATED;
};

module.exports = regHandler;
