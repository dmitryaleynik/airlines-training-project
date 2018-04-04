class AuthRequest {
  constructor(email, password, role) {
    this.email = email;
    this.password = password;
    this.role = role;
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
