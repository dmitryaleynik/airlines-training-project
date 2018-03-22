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

class ChangeNicknameResponse {
  constructor(failures) {
    if (failures) {
      for (let failure in failures) {
        this[failure] = failures[failure];
      }
    }
  }
}

class UserInfoResponse {
  constructor({ id, email, nickname, role, avatar, }) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.role = role;
    this.avatar = avatar;
  }
}

module.exports = {
  ChangeNicknameRequest,
  ChangeNicknameResponse,
  UserInfoRequest,
  UserInfoResponse,
  ChangeAvatarRequest,
};
