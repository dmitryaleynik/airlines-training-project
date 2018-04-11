class PlaneByIdRequest {
  constructor(id) {
    this.planeId = id;
  }
}

class PlaneResponse {
  constructor({ plane_id, plane_type, max_kg, }) {
    this.id = plane_id;
    this.type = plane_type;
    this.maxKg = max_kg;
  }
}

module.exports = {
  PlaneResponse,
  PlaneByIdRequest,
};
