const requireDependency = require('../../src/utils/requireDependency');

describe('test utils > requireDependency', () => {
  it('test requireDependency function', () => {
    const expected = require('../../src/utils/conversions');
    const result = requireDependency('/src/utils/conversions');
    expect(result).to.eql(expected);
  });
});
