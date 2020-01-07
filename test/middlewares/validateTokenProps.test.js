const jwt = require('jsonwebtoken');
const proxyquire = require('proxyquire');
const errorHandler = proxyquire('../../utils/errorHandler', {
  './requireDependency': (text) => ({
    errors: [
      {code: 'unauthorized'},
    ],
  }),
});
const validateToken = proxyquire('../../middlewares/validateTokenProps', {
  '../utils/errorHandler': errorHandler,
});

const createReqMock = (payload, params) => {
  const token = jwt.sign(payload, 'test');
  return {
    params,
    headers: {authorization: token},
  };
};

describe('test utils > validateTokenProps', () => {
  it('Token B2B', () => {
    const result = validateToken(
      'params',
      'test',
      ['id'],
    )(
      createReqMock({gty: 'client-credentials'}),
      null,
      () => true,
    );
    expect(result).to.be.true;
  });

  it('Token B2C is valid', () => {
    try {
      const result = validateToken(
        'params',
        'id',
        ['id'],
      )(
        createReqMock({id: '1'}, {id: '1'}),
        null,
        () => true,
      );
      expect(result).to.be.true;
    } catch (err) {
      expect(err.code).to.be.null;
    }
  });

  it('Token B2C is not valid', () => {
    try {
      validateToken(
        'params',
        'id',
        ['num'],
      )(
        createReqMock({id: '1'}, {id: '1'}),
        null,
        () => true,
      );
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
    }
  });
});

