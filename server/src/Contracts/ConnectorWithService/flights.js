class OrderedFlightRequest {
  constructor(id) {
    this.id = id;
  }
}

class FlightResponse {
  constructor({
    flight_id,
    city_from,
    city_to,
    date_from,
    date_to,
    plane_id,
    plane_type,
    luggage_kg,
    max_kg,
    free_kg,
    price_for_kg,
  }) {
    this.id = flight_id;
    this.city = {
      from: city_from,
      to: city_to,
    };
    this.date = {
      from: date_from,
      to: date_to,
    };
    this.planeId = plane_id;
    this.planeType = plane_type;
    this.luggage = {
      kg: luggage_kg,
      maxKg: max_kg,
      freeKg: free_kg,
      price: price_for_kg,
    };
  }
}

module.exports = {
  OrderedFlightRequest,
  FlightResponse,
};
