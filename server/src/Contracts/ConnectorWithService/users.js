class RegistrationRequest {
  constructor(email, passwordData, avatar) {
    this.email = email;
    this.passwordData = passwordData;
    this.avatar = avatar;
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
  constructor({ user_id, email, nickname, role, avatar, avatar_type, }) {
    this.id = user_id;
    this.email = email;
    this.nickname = nickname;
    this.role = role;
    this.avatar = `${avatar_type},${avatar.toString('base64')}`;
  }
}

module.exports = {
  UserByEmailRequest,
  UserResponse,
  PasswordDataRequest,
  PasswordDataResponse,
  RegistrationRequest,
  ChangeNicknameRequest,
  UserWithAvatarResponse,
  UserByIdRequest,
  ChangeAvatarRequest,
};
