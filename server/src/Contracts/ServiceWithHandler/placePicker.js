class GetPlacesRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class GetPlacesResponse {
  constructor({ rows, columns, seats, }) {
    this.rows = rows;
    this.columns = columns;
    this.seats = seats;
  }
}

module.exports = {
  GetPlacesRequest,
  GetPlacesResponse,
};
