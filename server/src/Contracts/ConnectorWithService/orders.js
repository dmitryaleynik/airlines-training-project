class OrdersByUserIdRequest {
  constructor(id) {
    this.id = id;
  }
}

class OrderByIdRequest {
  constructor(userId, orderId) {
    this.userId = userId;
    this.orderId = orderId;
  }
}

class OrderResponse {
  constructor({
    order_id,
    order_number,
    date_from,
    status,
    expires_at,
    total,
  }) {
    this.id = order_id;
    this.number = order_number;
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
