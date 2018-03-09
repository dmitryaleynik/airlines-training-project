class AuthRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class AuthResponse {
  constructor(token) {
    this.token = token;
  }
}

module.exports = {
  AuthRequest,
  AuthResponse,
};
