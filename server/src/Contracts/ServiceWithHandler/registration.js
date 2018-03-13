class RegistrationRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class RegistrationResponse {
  constructor(result, failures) {
    this.result = result;
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

module.exports = {
  RegistrationRequest,
  RegistrationResponse,
};
