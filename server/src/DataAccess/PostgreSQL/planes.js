const Request = require('./Request');

const getPlanes = async () => {
  return await new Request('SELECT * FROM get_planes()').send();
};

const getPlaneById = async planeId => {
  return await new Request('SELECT * FROM get_plane_by_id($1)', planeId).send();
};

const addPlane = async ({ type, maxKg, rows, columns, }) => {
  return await new Request(
    'SELECT * FROM add_plane($1, $2, $3, $4)',
    type,
    rows,
    columns,
    maxKg
  ).send();
};

module.exports = {
  getPlanes,
  getPlaneById,
  addPlane,
};
