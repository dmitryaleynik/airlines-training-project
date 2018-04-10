class FlightsResponse {
  constructor(flights) {
    this.flights = flights;
  }
}

class GetPlanesResponse {
  constructor(planes) {
    this.planes = planes;
  }
}

module.exports = {
  FlightsResponse,
  GetPlanesResponse,
};
