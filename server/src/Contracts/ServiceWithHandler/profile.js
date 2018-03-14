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

class OrdersByUserIdResponse {
  constructor(array) {
    this.orders = [...array,];
  }
}

class OrderByIdResponse {
  constructor(order, failures) {
    this.order = order;
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

module.exports = {
  OrdersByUserIdRequest,
  OrderByIdRequest,
  OrdersByUserIdResponse,
  OrderByIdResponse,
};
