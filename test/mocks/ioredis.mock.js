const {storage} = require('../../lib');

class Redis {
  constructor() {
    // this.data = {};
    this.storage = storage('redis');
  }

  // async get(key) {
  //   if (this.data) {
  //     const dir = await files.readDir('/test/data/redis');

  //     for (const file of dir) {
  //       const filename = file.substr(0, file.lastIndexOf('.'));
  //       this.data[filename] = files.readFile(`/test/data/redis/${file}`);
  //     }
  //   }
  //   return this.data[key];
  // }

  async get(key) {
    return this.storage.getItem(key);
  }

  async set(key, value) {
    return this.storage.setItem(key, value);
  }
}

module.exports = Redis;
