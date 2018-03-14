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
  constructor(id, status, total, expires_at) {
    this.id = id;
    this.status = status;
    this.total = total;
    this.expires_at = expires_at;
  }
}

module.exports = {
  OrdersByUserIdRequest,
  OrderByIdRequest,
  OrderResponse,
};
