class OrderedPlacesRequest {
  constructor(flightId, orderId) {
    this.flightId = flightId;
    this.orderId = orderId;
  }
}

class AvailablePlacesStatisticsRequest {
  constructor(flightId) {
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

class LinkPlaceWithOrderRequest {
  constructor(placeId, flightId, orderId) {
    this.placeId = placeId;
    this.flightId = flightId;
    this.orderId = orderId;
  }
}

class DeletePlaceBookingRequest {
  constructor(orderId, flightId, placeId) {
    this.placeId = placeId;
    this.flightId = flightId;
    this.orderId = orderId;
  }
}

class AddLuggageToBookingRequest {
  constructor({ orderId, flightId, luggageKg, userId, }) {
    this.orderId = orderId;
    this.flightId = flightId;
    this.luggageKg = luggageKg;
    this.userId = userId;
  }
}

class TypePricesRequest {
  constructor(id) {
    this.flightId = id;
  }
}

class TypeNamesRequest {
  constructor(id) {
    this.planeId = id;
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

class TypesPricesResponse {
  constructor({ tn, tp, }) {
    this.type = tn;
    this.price = tp;
  }
}

class TypeNamesResponse {
  constructor(places) {
    this.places = [];
    for (let place of places) {
      this.places.push(place.tname);
    }
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
  LinkPlaceWithOrderRequest,
  DeletePlaceBookingRequest,
  AddLuggageToBookingRequest,
  TypePricesRequest,
  TypesPricesResponse,
  TypeNamesRequest,
  TypeNamesResponse,
};
