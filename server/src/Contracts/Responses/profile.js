class GetOrdersResponse {
  constructor({ orders, }) {
    this.orders = orders;
  }
}

class GetOrderByIdResponse {
  constructor({ order, }) {
    this.order = order;
  }
}

module.exports = {
  GetOrderByIdResponse,
  GetOrdersResponse,
};
