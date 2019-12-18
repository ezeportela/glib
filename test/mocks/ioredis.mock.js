const {files} = require('../../common');

class Redis {
  constructor() {
    this.data = {};
  }

  async get(key) {
    if (this.data) {
      const dir = await files.readDir('/test/data/redis');

      for (const file of dir) {
        const filename = file.substr(0, file.lastIndexOf('.'));
        this.data[filename] = files.readFile(`/test/data/redis/${file}`);
      }
    }
    return this.data[key];
  }
}

module.exports = Redis;
