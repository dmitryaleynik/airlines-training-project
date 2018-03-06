const regService = require('../../Services/registration');

const regHandler = async ctx => {
  try {
    await regService.register(ctx.request.body);
    ctx.status = RESPONSES.CREATED;
    return;
  } catch (error) {
    logger.error(error);
    switch (error) {
      case ERRORS.CONFLICT:
        ctx.status = error;
        ctx.body = {
          id: 'Email is used.',
          description: 'Email is already used. Please try again.',
        };
        return;
      default:
        throw error;
    }
  }
};

module.exports = regHandler;
