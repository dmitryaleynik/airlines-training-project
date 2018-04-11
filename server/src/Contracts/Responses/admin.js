class FlightsResponse {
  constructor({ flights, }) {
    this.flights = flights;
  }
}

class Plane {
  constructor({ id, type, maxKg, places, }) {
    this.id = id;
    this.type = type;
    this.maxKg = maxKg;
    this.places = places;
  }
}

class PlaneShort {
  constructor({ id, type, }) {
    this.id = id;
    this.type = type;
  }
}

module.exports = {
  FlightsResponse,
  Plane,
  PlaneShort,
};
