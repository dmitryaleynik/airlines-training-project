class AddFlightRequest {
  constructor({
    cityFrom,
    cityTo,
    dateFrom,
    dateTo,
    planeId,
    places,
    freeKg,
    priceForKg,
  }) {
    this.cityFrom = cityFrom;
    this.cityTo = cityTo;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.planeId = planeId;
    this.places = places;
    this.freeKg = freeKg;
    this.priceForKg = priceForKg;
  }
}

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
  AddFlightRequest,
};
