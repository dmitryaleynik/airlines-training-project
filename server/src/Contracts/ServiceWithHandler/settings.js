class ChangeNicknameRequest {
  constructor(id, nickname) {
    this.id = id;
    this.nickname = nickname;
  }
}

class UserInfoRequest {
  constructor(id) {
    this.id = id;
  }
}

class ChangeAvatarRequest {
  constructor(id, avatar) {
    this.id = id;
    this.avatar = avatar;
  }
}

class UserInfoResponse {
  constructor({ id, email, nickname, role, avatar, }) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.role = role;
    this.avatar = avatar.toString('base64');
  }
}

module.exports = {
  ChangeNicknameRequest,
  UserInfoRequest,
  UserInfoResponse,
  ChangeAvatarRequest,
};
