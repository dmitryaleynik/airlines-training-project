class GetAllCitiesResponse {
  constructor({ cities, }) {
    console.log(cities);
    this.cities = cities;
  }
}

module.exports = {
  GetAllCitiesResponse,
};
