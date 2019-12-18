const proxyquire = require('proxyquire');

const redis = proxyquire('../../src/lib/redis', {
  'ioredis': require('../mocks/ioredis.mock'),
});

describe('test redis lib', () => {
  it('test get value', (done) => {
    redis().getValue('ping')
      .then((result) => {
        const expected = 'pong';
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test get value json', (done) => {
    redis().getValueJSON('test')
      .then((result) => {
        const expected = {
          name: 'Ezequiel',
          lastname: 'Portela',
          skills: ['nodejs'],
        };
        expect(result).eql(expected);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test get value json null value', (done) => {
    redis().getValueJSON('subscription')
      .then((result) => {
        expect(result).to.be.null;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
