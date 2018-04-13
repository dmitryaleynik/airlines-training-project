module.exports.validateBody = body => {
  for (let key in body) {
    if (body[key] === undefined) {
      return {
        valid: false,
        message: `Invalid body. ${key} is required.`,
      };
    }
  }
  return {
    valid: true,
  };
};
