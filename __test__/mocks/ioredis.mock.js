const {files} = require('../../common');

class Redis {
  constructor(connection) {
    this.data = {};
  }

  async get(key) {
    if (this.data) {
      const dir = await files.readDir('/__test__/data/redis');

      for (const file of dir) {
        const filename = file.substr(0, file.lastIndexOf('.'));
        this.data[filename] = files.readFile(`/__test__/data/redis/${file}`);
      }
    }

    return this.data[key];
  }
}

module.exports = Redis;
