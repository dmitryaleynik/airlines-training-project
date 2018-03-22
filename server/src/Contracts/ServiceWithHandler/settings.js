class ChangeNicknameRequest {
  constructor(id, nickname) {
    this.id = id;
    this.nickname = nickname;
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

module.exports = {
  ChangeNicknameRequest,
  ChangeNicknameResponse,
};
