const fs = require('fs');
const jsYaml = require('js-yaml');

const defaultOptions = {fullPath: true};
const defaultFullOptions = {fullPath: true, format: 'plain'};

class Files {
  getFilePath(path, fullPath = true) {
    return (fullPath ? process.env.PWD : __dirname).concat(path);
  }

  readFile(path, {fullPath, format} = defaultFullOptions) {
    const file = fs.readFileSync(this.getFilePath(path, fullPath), 'utf8');

    let content = '';
    switch (format) {
    case 'plain':
      content = file;
      break;
    case 'json':
      content = JSON.parse(file);
      break;
    case 'yaml':
      content = jsYaml.safeLoad(file);
      break;
    default:
      throw new Error('Invalid format');
    }

    return content;
  }

  writeFile(path, content, {fullPath, format} = defaultFullOptions) {
    const filepath = this.getFilePath(path, fullPath);
    const _writeFile = (content) => fs.writeFileSync(filepath, content);

    switch (format) {
    case 'plain':
      return _writeFile(content);
    case 'json':
      return _writeFile(JSON.stringify(content, null, 2));
    case 'yaml': {
      const _content = jsYaml.safeDump(content);
      return _writeFile(_content);
    }
    default:
      throw new Error('Invalid format');
    }
  }

  existsFile(path, {fullPath} = defaultOptions) {
    return fs.existsSync(this.getFilePath(path, fullPath));
  }

  removeFile(path, {fullPath} = defaultOptions) {
    return fs.unlinkSync(this.getFilePath(path, fullPath));
  }

  makeDir(dir, {fullPath} = defaultOptions) {
    return fs.mkdirSync(this.getFilePath(dir, fullPath));
  }

  readDir(dir, {fullPath} = defaultOptions) {
    return fs.readdirSync(this.getFilePath(dir, fullPath));
  }

  removeDir(dir, {fullPath} = defaultOptions) {
    return fs.rmdirSync(this.getFilePath(dir, fullPath));
  }
}

module.exports = new Files();
