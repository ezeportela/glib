const proxyquire = require('proxyquire');
const errorHandler = proxyquire('../../src/utils/errorHandler', {
  './requireDependency': (text) => ({
    errors: [
      {code: 'unauthorized'},
    ],
  }),
});

const {createError, handleError, resolveError} = errorHandler;

const {resMock} = require('../mocks/utils.mock');

describe('test utils > error handler', () => {
  it('create Error', (done) => {
    try {
      createError('invalid_data');
    } catch (err) {
      expect(err.code).to.eql('invalid_data');
      done();
    }
  });

  it('handle error unauthorized', (done) => {
    try {
      handleError({statusCode: 401});
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
      done();
    }
  });

  it('handle default error', (done) => {
    try {
      handleError({}, 'invalid_data');
    } catch (err) {
      expect(err.code).to.eql('invalid_data');
      done();
    }
  });

  it('handle resolve error', (done) => {
    try {
      createError('unknow');
    } catch (err) {
      resolveError(err, resMock);
      done();
    }
  });
});
