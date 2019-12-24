const files = require('../../src/common/files');

const paths = {
  plainSrc: '/test/data/redis/ping.txt',
  jsonSrc: '/test/data/redis/test.json',
  jsonTest: '/test/common/test.json',
  yamlTest: '/test/common/test.yaml',
  plainTest: '/test/common/test.txt',
  dirTest: '/test/common/.tests',
};

describe('test common > files', () => {
  it('test full & relative paths', (done) => {
    const fullPathFile = files.readFile(paths.jsonSrc, {format: 'plain'});
    const relativePathFile = files.readFile('/../../test/data/redis/test.json', {fullPath: false, format: 'plain'});
    expect(fullPathFile).to.eql(relativePathFile);
    done();
  });

  it('test read & write json file', (done) => {
    const content = files.readFile(paths.jsonSrc, {format: 'json'});
    files.writeFile(paths.jsonTest, content, {format: 'json'});
    const result = files.readFile(paths.jsonTest, {format: 'json'});
    expect(result).to.eql(content);
    done();
  });

  it('test exists & remove json file', (done) => {
    const exists = files.existsFile(paths.jsonTest);
    expect(exists).to.be.true;
    files.removeFile(paths.jsonTest);
    done();
  });

  it('test read & write yaml file', (done) => {
    const content = files.readFile(paths.jsonSrc, {format: 'json'});
    files.writeFile(paths.yamlTest, content, {format: 'yaml'});
    const result = files.readFile(paths.yamlTest, {format: 'yaml'});
    expect(result).to.eql(content);
    done();
  });

  it('test exists & remove yaml file', (done) => {
    const exists = files.existsFile(paths.yamlTest);
    expect(exists).to.be.true;
    files.removeFile(paths.yamlTest);
    done();
  });

  it('test read & write plain file', (done) => {
    const content = files.readFile(paths.plainSrc);
    files.writeFile(paths.plainTest, content);
    const result = files.readFile(paths.plainTest);
    expect(result).to.eql(content);
    done();
  });

  it('test exists & remove plain file', (done) => {
    const exists = files.existsFile(paths.plainTest);
    expect(exists).to.be.true;
    files.removeFile(paths.plainTest);
    done();
  });

  it('test read file throw an error', (done) => {
    try {
      files.readFile(paths.plainSrc, {format: 'csv'});
      done();
    } catch (err) {
      expect(err.message).to.eql('The format specified is unknown');
      done();
    }
  });

  it('test write file throw an error', (done) => {
    try {
      files.writeFile(paths.plainSrc, 'pong', {format: 'csv'});
      done();
    } catch (err) {
      expect(err.message).to.eql('The format specified is unknown');
      done();
    }
  });

  it('test make a dir', (done) => {
    const dirPath = paths.dirTest;
    files.makeDir(dirPath);
    const exists = files.existsFile(dirPath);
    expect(exists).to.be.true;
    files.removeDir(dirPath);
    done();
  });
});
