const HttpStatus = require('http-status-codes');
const regService = require('../../Services/registration');
const fetchResponse = require('../../utils/response');

const {
  RegistrationRequest,
} = require('../../Contracts/ServiceWithHandler/registration');

const regHandler = async ctx => {
  const { body, } = ctx.request;
  const request = new RegistrationRequest(body.email, body.password);
  const response = await regService.register(request);
  if (response.emailUsed) {
    fetchResponse(
      ctx,
      HttpStatus.CONFLICT,
      'Registration failed. Email is already used.'
    );
    return;
  }
  fetchResponse(ctx, HttpStatus.CREATED);
};

module.exports = regHandler;
