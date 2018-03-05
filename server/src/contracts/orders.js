const ordersDb = require('../DataAccessLayer/orders');

class Order {
  constructor (status, leave_at, total) {
    this.status = status;
    this.leave_at = leave_at;
    this.total = total;
  }
}

module.exports = Order;