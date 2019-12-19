const fs = require('fs');
const jsYaml = require('js-yaml');

const getRelativeFilePath = (filepath) => `${__dirname}/${filepath}`;

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const readYamlFile = (filepath) => jsYaml.safeLoad(filepath);

const readDir = (dir) => new Promise((resolve, reject) =>
  fs.readdir(dir, (err, files) => {
    if (err) return reject(err);

    return resolve(files);
  }),
);

class Files {
  getCurrentDirectoryBase() {
    return process.env.PWD;
  }

  getFilePath(filepath) {
    return `${this.getCurrentDirectoryBase()}${filepath}`;
  }

  readRelativeFile(filepath) {
    return readFile(getRelativeFilePath(filepath));
  }

  readFile(filepath) {
    return readFile(this.getFilePath(filepath));
  }

  writeFile(filepath, content) {
    fs.writeFileSync(this.getFilePath(filepath), content);
  }

  readJsonFile(filepath) {
    return JSON.parse(this.readFile(filepath));
  }

  readYamlFile(filepath) {
    return readYamlFile(this.readFile(filepath));
  }

  readYamlRelativeFile(filepath) {
    return readYamlFile(this.readRelativeFile(filepath));
  }

  writeJsonFile(filepath, content) {
    return this.writeFile(filepath, JSON.stringify(content, null, 2));
  }

  writeYamlFile(filepath, content) {
    const result = jsYaml.safeDump(content);
    return this.writeFile(filepath, result);
  }

  existsFile(filepath) {
    fs.existsSync(this.getFilePath(filepath));
  }

  makeDir(dir) {
    fs.mkdirSync(this.getFilePath(dir));
  }

  readDir(dir) {
    return readDir(this.getFilePath(dir));
  }

  readRelativeDir(dir) {
    return readDir(this.getRelativeFilePath(dir));
  }
}

module.exports = new Files();
