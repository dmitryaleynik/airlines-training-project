class OrdersByIdRequest {
  constructor(id) {
    this.id = id;
  }
}

class OrdersByIdResponse {
  constructor(array) {
    this.orders = [...array,];
  }
}

module.exports = {
  OrdersByIdRequest,
  OrdersByIdResponse,
};
