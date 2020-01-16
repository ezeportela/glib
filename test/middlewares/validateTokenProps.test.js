const jwt = require('jsonwebtoken');
const proxyquire = require('proxyquire');
const errorHandler = proxyquire('../../utils/errorHandler', {
  './requireDependency': (text) => ({
    errors: [{code: 'unauthorized'}],
  }),
});
const validateTokenProps = proxyquire('../../middlewares/validateTokenProps', {
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
    const result = validateTokenProps('params', ['test'], ['id'])(
      createReqMock({gty: 'client-credentials'}),
      null,
      () => true,
    );
    expect(result).to.be.true;
  });

  it('Token B2C is valid', () => {
    try {
      const result = validateTokenProps('params', ['idx', 'id'], ['id'])(
        createReqMock({id: '1'}, {id: '1'}),
        null,
        () => true,
      );
      expect(result).to.be.true;
    } catch (err) {
      expect(err.code).to.be.null;
    }
  });

  it('Token B2C is valid with pipe', () => {
    try {
      const result = validateTokenProps(
        'params',
        ['cuit', 'identity'],
        ['dni', 'sub'],
        (text, colName) => {
          return colName == 'identity' ? `auth0|${text}` : text;
        },
      )(
        createReqMock({sub: 'auth0|NT30'}, {identity: 'NT30'}),
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
      const result = validateTokenProps('params', ['id'], ['num'])(
        createReqMock({id: '1'}, {id: '1'}),
        null,
        () => true,
      );
      expect(result).to.be.false;
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
    }
  });

  it('Token B2C is not valid with pipe', () => {
    try {
      const result = validateTokenProps(
        'params',
        ['cuit', 'identity'],
        ['dni', 'sub'],
        (text, colName) => {
          return colName == 'identity' ? `auth0|${text}` : text;
        },
      )(
        createReqMock({sub: 'auth0|NT30'}, {identity: 'NT31'}),
        null,
        () => true,
      );
      expect(result).to.be.false;
    } catch (err) {
      expect(err.code).to.eql('unauthorized');
    }
  });
});
