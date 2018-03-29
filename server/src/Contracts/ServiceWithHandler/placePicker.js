class GetPlacesRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class BookTemporarilyRequest {
  constructor({ flightId, luggageKg, }, userId) {
    this.flightId = flightId;
    this.luggageKg = luggageKg || 0;
    this.userId = userId;
  }
}

class AddToBookingRequest {
  constructor({ orderId, flightId, luggageKg, }) {
    this.orderId = orderId;
    this.flightId = flightId;
    this.luggageKg = luggageKg;
  }
}

class BookPlaceRequest {
  constructor(orderId, flightId, placeId) {
    this.orderId = orderId;
    this.flightId = flightId;
    this.placeId = placeId;
  }
}

class DeletePlaceBookingRequest {
  constructor(orderId, flightId, placeId) {
    this.orderId = orderId;
    this.flightId = flightId;
    this.placeId = placeId;
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

class BookPlaceResponse {
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
  BookPlaceRequest,
  BookPlaceResponse,
  DeletePlaceBookingRequest,
};
