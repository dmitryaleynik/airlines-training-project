const Request = require('./Request');

const getPlanes = async () => {
  return await new Request('SELECT * FROM get_planes()').send();
};

module.exports = {
  getPlanes,
};
