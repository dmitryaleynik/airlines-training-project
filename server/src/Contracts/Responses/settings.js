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
  UserInfoResponse,
};
