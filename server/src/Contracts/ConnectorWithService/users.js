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

class ChangeNicknameRequest {
  constructor(id, nickname) {
    this.id = id;
    this.nickname = nickname;
  }
}

class ChangeAvatarRequest {
  constructor(id, avatar) {
    this.id = id;
    this.avatar = avatar;
  }
}

class UserByIdRequest {
  constructor(id) {
    this.id = id;
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

class UserWithAvatarResponse {
  constructor({ user_id, email, nickname, role, avatar, }) {
    this.id = user_id;
    this.email = email;
    this.nickname = nickname;
    this.role = role;
    this.avatar = avatar;
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
  UserWithAvatarResponse,
  UserByIdRequest,
  ChangeAvatarRequest,
};
