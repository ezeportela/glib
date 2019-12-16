const requireDependency = require('../../src/utils/requireDependency');

describe('test utils requireDependency', () => {
  test('test requireDependency function', () => {
    const expected = require('../../src/utils/conversions');
    const result = requireDependency('/src/utils/conversions');
    expect(result).toEqual(expected);
  });
});
