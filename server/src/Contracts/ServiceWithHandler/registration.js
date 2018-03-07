class RegistrationRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class RegistrationResponse {
  constructor(result) {
    this.result = result;
  }
}

module.exports = {
  RegistrationRequest,
  RegistrationResponse,
};
