const proxyquire = require('proxyquire');

const redis = proxyquire('../../src/lib/redis', {
  'ioredis': require('../mocks/ioredis.mock'),
});

describe('test lib > redis', () => {
  it('test set & get plain value', (done) => {
    const _redis = redis();
    const key = 'ping';
    const expected = 'pong';
    _redis.setItem(key, expected);
    _redis.getItem(key)
      .then((result) => {
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test set & get json value', (done) => {
    const _redis = redis();
    const key = 'foo';
    const expected = {
      prop: 'bar',
    };
    _redis.setItem(key, expected, 'json');
    _redis.getItem(key, 'json')
      .then((result) => {
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test get not found value', (done) => {
    const _redis = redis();
    const key = 'test';
    _redis.getItem(key, 'json')
      .then((result) => {
        expect(result).to.be.null;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test set value invalid format', (done) => {
    try {
      const _redis = redis();
      _redis.setItem('foo', 'bar', 'csv');
      done('error: the format is invalid');
    } catch (error) {
      expect(error.message).to.eql('Invalid format');
      done();
    }
  });

  it('test get value invalid format', (done) => {
    const _redis = redis();
    _redis.getItem('foo', 'csv')
      .then((result) => {
        done('error: the format is invalid');
      })
      .catch((error) => {
        expect(error.message).to.eql('Invalid format');
        done();
      });
  });
});
