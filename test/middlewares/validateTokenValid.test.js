const jwt = require('jsonwebtoken');
const proxyquire = require('proxyquire');
const errorHandler = proxyquire('../../src/utils/errorHandler', {
  './requireDependency': (text) => ({
    errors: [
      {code: 'unauthorized'},
    ],
  }),
});

const validateToken = proxyquire('../../src/middlewares/validateTokenValid', {
  '../utils/errorHandler': errorHandler,
});

const createReqMock = (payload, params, options = {}) => {
  const token = jwt.sign(payload, 'test', options);
  return {
    params,
    headers: {authorization: token},
  };
};

describe('test utils > validateTokenValid', () => {
  it('token without audiences is valid', () => {
    const result = validateToken(
      [],
    )(
      createReqMock({}),
      null,
      () => true,
    );
    expect(result).to.be.true;
  });

  it('token with audience is valid', () => {
    const result = validateToken(
      ['localhost'],
    )(
      createReqMock({aud: 'localhost'}),
      null,
      () => true,
    );
    expect(result).to.be.true;
  });

  it('token with audiences is valid', () => {
    const result = validateToken(
      ['localhost'],
    )(
      createReqMock({aud: ['localhost']}),
      null,
      () => true,
    );
    expect(result).to.be.true;
  });

  it('token with audience is not valid for invalid audience', () => {
    try {
      validateToken(
        ['local'],
      )(
        createReqMock({aud: 'localhost'}),
        null,
        () => true,
      );
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
    }
  });

  it('token with audience is not valid for exp', () => {
    try {
      validateToken(
        ['local'],
      )(
        createReqMock({aud: 'localhost'}, null, {expiresIn: -120}),
        null,
        () => true,
      );
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
    }
  });
});

