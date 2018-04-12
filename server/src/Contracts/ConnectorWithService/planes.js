class PlaneByIdRequest {
  constructor(id) {
    this.planeId = id;
  }
}

class PlaneResponse {
  constructor({ plane_id, plane_type, max_kg, rows, columns, }) {
    this.id = plane_id;
    this.type = plane_type;
    this.maxKg = max_kg;
    this.rows = rows;
    this.columns = columns;
  }
}

module.exports = {
  PlaneResponse,
  PlaneByIdRequest,
};
