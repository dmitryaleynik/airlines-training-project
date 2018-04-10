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

class GetPlaneByIdResponse {
  constructor(plane) {
    this.plane = plane;
  }
}

module.exports = {
  FlightsResponse,
  GetPlanesResponse,
  GetPlaneByIdResponse,
};
