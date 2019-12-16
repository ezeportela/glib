const requireDependency = require('../../lib/utils/requireDependency');

describe('test utils requireDependency', () => {
  test('test requireDependency function', () => {
    const expected = require('../../lib/utils/conversions');
    const result = requireDependency('/lib/utils/conversions');
    expect(result).toEqual(expected);
  });
});