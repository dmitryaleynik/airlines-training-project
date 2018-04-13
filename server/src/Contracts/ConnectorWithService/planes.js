class PlaneByIdRequest {
  constructor(id) {
    this.planeId = id;
  }
}

class AddPlaneRequest {
  constructor({ type, rows, columns, maxKg, }) {
    this.type = type;
    this.rows = rows;
    this.columns = columns;
    this.maxKg = maxKg;
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

class AddPlaneResponse {
  constructor({ plane_id, }) {
    this.planeId = plane_id;
  }
}

module.exports = {
  PlaneResponse,
  PlaneByIdRequest,
  AddPlaneRequest,
  AddPlaneResponse,
};
