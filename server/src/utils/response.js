module.exports = (ctx, code, message) => {
  ctx.status = code;
  if (message) {
    if (typeof message === 'string' || 'number') {
      ctx.body = {
        message,
      };
    } else {
      ctx.body = message;
    }
  }
  return true;
};
