const proxyquire = require('proxyquire');

const redis = proxyquire('../../src/lib/redis', {
  'ioredis': require('../mocks/ioredis.mock'),
});

describe('test lib > redis', () => {
  it('test get value', (done) => {
    redis().getItem('ping')
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
    redis().getItem('test', 'json')
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
    redis().getItem('subscription', 'json')
      .then((result) => {
        expect(result).to.be.null;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('test get value invalid format', (done) => {
    redis().getItem('test', 'csv')
      .then((result) => {
        done('error: the format is invalid');
      })
      .catch((error) => {
        console.log('pass here');
        expect(error.message).to.eql('Invalid format');
        done();
      });
  });
});
