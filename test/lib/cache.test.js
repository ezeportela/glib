const cache = require('../../src/lib/cache');

describe('test cache lib', () => {
  it('test get value', (done) => {
    const expected = 'one';
    const testCache = cache('test');
    testCache.clear();
    testCache.setItem('foo', 'one', [1, 'hours']);
    const result = testCache.getItem('foo');
    expect(result).eql(expected);
    done();
  });

  it('test get value expire', (done) => {
    const testCache = cache('test');
    testCache.clear();
    testCache.setItem('bar', 'two', [-1, 'hours']);
    const result = testCache.getItem('bar');
    expect(result).to.be.null;
    done();
  });

  it('test get value not found', (done) => {
    const testCache = cache('test');
    testCache.clear();
    const result = testCache.getItem('foo');
    expect(result).to.be.null;
    done();
  });
});
