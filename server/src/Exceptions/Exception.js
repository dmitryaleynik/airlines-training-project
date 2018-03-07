class Exception extends Error {
  constructor(message) {
    super(message);
    this.timestamp = new Date().toUTCString();
  }

  represent() {
    return {
      timestamp: this.timestamp,
      message: this.message,
    };
  }
}

module.exports = Exception;
