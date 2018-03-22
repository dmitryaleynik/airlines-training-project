class RegistrationRequest {
  constructor(email, passwordData) {
    this.email = email;
    this.passwordData = passwordData;
  }
}

class UserByEmailRequest {
  constructor(email) {
    this.email = email;
  }
}

class PasswordDataRequest {
  constructor(id) {
    this.id = id;
  }
}

class GetUserByNicknameRequest {
  constructor(nickname) {
    this.nickname = nickname;
  }
}

class ChangeNicknameRequest {
  constructor(id, nickname) {
    this.id = id;
    this.nickname = nickname;
  }
}

class UserResponse {
  constructor({ user_id, email, nickname, role, }) {
    this.id = user_id;
    this.email = email;
    this.nickname = nickname;
    this.role = role;
  }
}

class PasswordDataResponse {
  constructor(hash, salt) {
    this.hash = hash;
    this.salt = salt;
  }
}

module.exports = {
  UserByEmailRequest,
  UserResponse,
  PasswordDataRequest,
  PasswordDataResponse,
  RegistrationRequest,
  GetUserByNicknameRequest,
  ChangeNicknameRequest,
};
