const files = require('../../src/common/files');

describe('test common > files', () => {
  it('test read & write json file', (done) => {
    const json = files.readJsonFile('/test/data/redis/test.json');
    files.writeJsonFile('/test/common/test.json', json);
    const result = files.readJsonFile('/test/common/test.json');
    expect(result).to.eql(json);
    done();
  });

  it('test exists & remove file', (done) => {
    const exists = files.existsFile('/test/common/test.json');
    expect(exists).to.be.true;
    files.removeFile('/test/common/test.json');
    done();
  });
});
