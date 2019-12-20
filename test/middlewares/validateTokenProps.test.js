const jwt = require('jsonwebtoken');
const validateToken = require('../../src/middlewares/validateTokenProps');

const createReqMock = (payload) => {
  const token = jwt.sign({gty: 'client-credentials'}, 'test');
  return {headers: {authorization: token}};
};

describe('test utils validateToken', () => {
  it('Token B2B', () => {
    const result = validateToken('params', 'test', ['id'])(createReqMock({gty: 'client-credentials'}), null, () => {});
    console.log(result);
  });
});
