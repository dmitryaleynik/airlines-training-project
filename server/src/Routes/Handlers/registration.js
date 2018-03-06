const regService = require('../../Services/registration');

const regHandler = async ctx => {
  const result = await regService.register(ctx.request.body);
  ctx.body = result;
};

module.exports = regHandler;
