class OrderedPlacesRequest {
  constructor(flightId, orderId) {
    this.flightId = flightId;
    this.orderId = orderId;
  }
}

class AvailablePlacesStatisticsRequest {
  constructor(planeId, flightId) {
    this.planeId = planeId;
    this.flightId = flightId;
  }
}

class PlaneSizesRequest {
  constructor(flightId) {
    this.flightId = flightId;
  }
}

class PlacesWithAvailabilityRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class PlaceResponse {
  constructor({ place_id, place_number, type_name, price, availability, }) {
    this.id = place_id;
    this.number = place_number;
    this.type = type_name;
    this.price = price;
    this.isAvailable = availability;
  }
}

class AvailablePlacesStatisticsResponse {
  constructor({ amount, type_name, price, }) {
    this.amount = Number(amount);
    this.type = type_name;
    this.price = price;
  }
}

class PlaneSizesResponse {
  constructor({ rows, columns, }) {
    this.rows = rows;
    this.columns = columns;
  }
}

module.exports = {
  PlaceResponse,
  OrderedPlacesRequest,
  AvailablePlacesStatisticsRequest,
  AvailablePlacesStatisticsResponse,
  PlaneSizesRequest,
  PlaneSizesResponse,
  PlacesWithAvailabilityRequest,
};
