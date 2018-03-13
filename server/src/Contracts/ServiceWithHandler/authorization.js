class AuthRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class AuthResponse {
  constructor(token, failures) {
    this.token = token;
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

module.exports = {
  AuthRequest,
  AuthResponse,
};
