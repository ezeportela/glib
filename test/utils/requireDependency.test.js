const requireDependency = require('../../utils/requireDependency');

describe('test utils > requireDependency', () => {
  it('test requireDependency function', () => {
    const expected = require('../../utils/conversions');
    const result = requireDependency('/utils/conversions');
    expect(result).to.eql(expected);
  });
});
