class Order {
  constructor({ id, leaveAt, status, total, }) {
    this.id = id;
    this.leaveAt = leaveAt;
    this.status = status;
    this.total = total;
  }
}

module.exports = Order;
