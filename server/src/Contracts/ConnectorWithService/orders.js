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

class NewOrderRequest {
  constructor(flightId, userId, expiresAt) {
    this.flightId = flightId;
    this.userId = userId;
    this.expiresAt = expiresAt;
  }
}

class ConfirmOrderRequest {
  constructor(orderId) {
    this.orderId = orderId;
  }
}

class CancelOrderRequest {
  constructor(orderId) {
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

class OrderIdResponse {
  constructor(id) {
    this.id = id;
  }
}

module.exports = {
  OrdersByUserIdRequest,
  OrderByIdRequest,
  OrderResponse,
  NewOrderRequest,
  OrderIdResponse,
  ConfirmOrderRequest,
  CancelOrderRequest,
};
