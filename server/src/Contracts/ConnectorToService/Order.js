class Order {
  constructor(id, leave_at, status, total) {
    this.id = id;
    this.leaveAt = leave_at;
    this.status = status;
    this.total = total;
  }
}

module.exports = Order;
