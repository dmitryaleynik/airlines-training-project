const Request = require('./Request');

const getPlanes = async () => {
  return await new Request('SELECT * FROM get_planes()').send();
};

const getPlaneById = async planeId => {
  return await new Request('SELECT * FROM get_plane_by_id($1)', planeId).send();
};

module.exports = {
  getPlanes,
  getPlaneById,
};
