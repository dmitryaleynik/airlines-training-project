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

class AddToBookingRequest {
  constructor({ orderId, flightId, placeIds, luggageKg, }) {
    this.orderId = orderId;
    this.flightId = flightId;
    this.placeIds = placeIds;
    this.luggageKg = luggageKg;
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

class AddToBookingResponse {
  constructor(failures) {
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

module.exports = {
  GetPlacesRequest,
  GetPlacesResponse,
  BookTemporarilyRequest,
  OrderIdResponse,
  AddToBookingRequest,
  AddToBookingResponse,
};
