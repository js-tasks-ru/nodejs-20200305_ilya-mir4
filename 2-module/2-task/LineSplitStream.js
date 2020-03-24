const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    console.warn();
  }

  _transform(chunk, encoding, callback) {
    console.warn(chunk.toString().split());
    const currentData = chunk.toString().split(os.EOL);
    console.warn(currentData);
    currentData.forEach(data => {
      console.warn(data);
      this.push(data)
    })
    callback(null);
  }

  _flush() {
  }
}

module.exports = LineSplitStream;
