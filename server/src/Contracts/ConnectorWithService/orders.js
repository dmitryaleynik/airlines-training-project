class OrdersByUserIdRequest {
  constructor(id) {
    this.id = id;
  }
}

class OrderByIdRequest {
  constructor(id) {
    this.id = id;
  }
}

class OrderResponse {
  constructor({ order_id, number, date_from, status, expires_at, total, }) {
    this.id = order_id;
    this.number = number;
    this.dateFrom = date_from;
    this.status = status;
    this.expiresAt = expires_at;
    this.total = total;
  }
}

module.exports = {
  OrdersByUserIdRequest,
  OrderByIdRequest,
  OrderResponse,
};
