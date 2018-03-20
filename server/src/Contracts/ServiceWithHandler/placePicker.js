class GetPlacesRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class BookTemporarilyRequest {
  constructor({ flightId, placeIds, luggageKg, }, userId) {
    this.flightId = flightId;
    this.placeIds = placeIds;
    this.luggageKg = luggageKg;
    this.userId = userId;
  }
}

class GetPlacesResponse {
  constructor({ rows, columns, seats, }) {
    this.rows = rows;
    this.columns = columns;
    this.seats = seats;
  }
}

class OrderIdResponse {
  constructor(id) {
    this.id = id;
  }
}

module.exports = {
  GetPlacesRequest,
  GetPlacesResponse,
  BookTemporarilyRequest,
  OrderIdResponse,
};
