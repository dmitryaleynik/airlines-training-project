class GetPlacesRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class BookTemporarilyRequest {
  constructor({ flightId, placeIds, luggageKg, }, userId) {
    this.flightId = flightId;
    this.placeIds = placeIds;
    this.luggageKg = luggageKg || 0;
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
  constructor(failures, params) {
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
      return;
    }
    this.rows = params.rows;
    this.columns = params.columns;
    this.seats = params.seats;
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
