const cache = require('../../src/lib/cache');

describe('test lib > cache', () => {
  it('test get value', (done) => {
    const expected = 'one';
    const _cache = cache('test');
    _cache.clear();
    _cache.setItem('foo', 'one', [1, 'hours']);
    const result = _cache.getItem('foo');
    expect(result).eql(expected);
    _cache.removeItem('foo');
    done();
  });

  it('test get value expire', () => {
    const _cache = cache('test');
    _cache.clear();
    _cache.setItem('bar', 'two', [-1, 'hours']);
    const result = _cache.getItem('bar');
    expect(result).to.be.null;
  });

  it('test get value not found', () => {
    const _cache = cache('test');
    _cache.clear();
    const result = _cache.getItem('foo');
    expect(result).to.be.null;
  });
});
