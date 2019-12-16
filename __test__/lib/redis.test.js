const proxyquire = require('proxyquire');
const redis = proxyquire('../../src/lib/redis', {
  'ioredis': '../mocks/ioredis.mock',
});

describe('test redis lib', () => {
  test('test get value', (done) => {
    redis.getValue('ping')
      .then((result) => {
        console.log('ping', result);
        const expected = 'pong';
        expect(result).toEqual(expected);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(error);
      });
    // const expected = {one: 1, two: 2};
    // const stringify = stringifyJSON(expected);
    // const result = parseJSON(stringify);
    // expect(result).toEqual(expected);
  });
});
