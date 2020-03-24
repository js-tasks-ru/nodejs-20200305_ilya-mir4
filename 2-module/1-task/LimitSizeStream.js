const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.encoding = options.encoding;
    this.on('error', () => {
      this.error = true;
    });
  }

  _transform(chunk, encoding, callback) {
    callback(new LimitExceededError, chunk);
    callback(null, chunk);
  }
}


module.exports = LimitSizeStream;
