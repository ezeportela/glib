const proxyquire = require('proxyquire');

const RedisService = proxyquire('../../lib/redis.service', {
  'ioredis': require('../mocks/ioredis.mock'),
});

describe('test lib > redis', () => {
  it('test set & get plain value', (done) => {
    const redis = new RedisService();
    const key = 'ping';
    const expected = 'pong';
    redis.setItem(key, expected);
    redis.getItem(key)
      .then((result) => {
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test set & get json value', (done) => {
    const redis = new RedisService();
    const key = 'foo';
    const expected = {
      prop: 'bar',
    };
    redis.setItem(key, expected, 'json');
    redis.getItem(key, 'json')
      .then((result) => {
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test get not found value', (done) => {
    const redis = new RedisService();
    const key = 'test';
    redis.getItem(key, 'json')
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
      const redis = new RedisService();
      redis.setItem('foo', 'bar', 'csv');
      done('error: the format is invalid');
    } catch (error) {
      expect(error.message).to.eql('Invalid format');
      done();
    }
  });

  it('test get value invalid format', (done) => {
    const redis = new RedisService();
    redis.getItem('foo', 'csv')
      .then((result) => {
        done('error: the format is invalid');
      })
      .catch((error) => {
        expect(error.message).to.eql('Invalid format');
        done();
      });
  });
});
