class PasswordDataResponse {
  constructor(hash, salt) {
    this.hash = hash;
    this.salt = salt;
  }
}

module.exports = {
  PasswordDataResponse,
};
