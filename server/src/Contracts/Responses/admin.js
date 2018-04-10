class FlightsResponse {
  constructor({ flights, }) {
    this.flights = flights;
  }
}

class PlaneShort {
  constructor({ id, type, places, }) {
    this.id = id;
    this.type = type;
    this.places = places;
  }
}

module.exports = {
  FlightsResponse,
  PlaneShort,
};
