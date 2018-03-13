class OrderResponse {
  constructor(id, status, total, expires_at) {
    this.id = id;
    this.status = status;
    this.total = total;
    this.expires_at = expires_at;
  }
}

class OrdersByIdRequest {
  constructor(id) {
    this.id = id;
  }
}

module.exports = {
  OrdersByIdRequest,
  OrderResponse,
};
