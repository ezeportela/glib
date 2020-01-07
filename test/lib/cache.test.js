const CacheService = require('../../src/lib/cache.service');

describe('test lib > cache', () => {
  it('test get value', (done) => {
    const expected = 'one';
    const instance = new CacheService('test');
    instance.clear();
    instance.setItem('foo', 'one', [1, 'hours']);
    const result = instance.getItem('foo');
    expect(result).eql(expected);
    instance.removeItem('foo');
    done();
  });

  it('test get value expire', () => {
    const instance = new CacheService('test');
    instance.clear();
    instance.setItem('bar', 'two', [-1, 'hours']);
    const result = instance.getItem('bar');
    expect(result).to.be.null;
  });

  it('test get value not found', () => {
    const instance = new CacheService('test');
    instance.clear();
    const result = instance.getItem('foo');
    expect(result).to.be.null;
  });
});
