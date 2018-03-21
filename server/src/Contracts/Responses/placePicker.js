class GetPlacesResponse {
  constructor({ rows, columns, seats, }) {
    this.rows = rows;
    this.columns = columns;
    this.rows = rows;
    this.seats = seats;
  }
}

class OrderIdResponse {
  constructor({ id, }) {
    this.orderId = id;
  }
}

module.exports = {
  GetPlacesResponse,
  OrderIdResponse,
};
