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

class PlaceResponse {
  constructor({ place_id, place_number, type_name, price, }) {
    this.id = place_id;
    this.number = place_number;
    this.type = type_name;
    this.price = price;
  }
}

class AvailablePlacesStatisticsResponse {
  constructor({ amount, type_name, price, }) {
    this.amount = Number(amount);
    this.type = type_name;
    this.price = price;
  }
}

module.exports = {
  PlaceResponse,
  OrderedPlacesRequest,
  AvailablePlacesStatisticsRequest,
  AvailablePlacesStatisticsResponse,
};
