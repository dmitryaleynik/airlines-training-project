class ConfirmBookingRequest {
  constructor({ orderId, }, userId) {
    this.orderId = orderId;
    this.userId = userId;
  }
}

class CancelBookingRequest {
  constructor({ orderId, }) {
    this.orderId = orderId;
  }
}

class ConfirmBookingResponse {
  constructor(failures) {
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

module.exports = {
  ConfirmBookingRequest,
  CancelBookingRequest,
  ConfirmBookingResponse,
};
