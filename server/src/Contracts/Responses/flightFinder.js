class GetAllCitiesResponse {
  constructor({ cities, }) {
    this.cities = cities;
  }
}

class GetFlightsResponse {
  constructor({ flights, }) {
    this.flights = flights;
  }
}

module.exports = {
  GetAllCitiesResponse,
  GetFlightsResponse,
};
