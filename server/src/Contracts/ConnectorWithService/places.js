class PlaceResponse {
  constructor({ place_id, place_number, type_name, price, }) {
    this.id = place_id;
    this.number = place_number;
    this.type = type_name;
    this.price = price;
  }
}

module.exports = {
  PlaceResponse,
};
