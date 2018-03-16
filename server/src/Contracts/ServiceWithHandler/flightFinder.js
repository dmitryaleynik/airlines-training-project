class GetFlightsRequest {
  constructor({ city_from, city_to, date_from, date_to, seats, }) {
    this.cityFrom = city_from;
    this.cityTo = city_to;
    this.dateFrom = date_from;
    this.dateTo = date_to;
    this.seats = Number(seats);
  }
}

class GetAllCitiesResponse {
  constructor({ cities, }) {
    this.cities = cities;
  }
}

class GetFlightsResponse {
  constructor(flights) {
    this.flights = [...flights,];
  }
}

module.exports = {
  GetAllCitiesResponse,
  GetFlightsRequest,
  GetFlightsResponse,
};
