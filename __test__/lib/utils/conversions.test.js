const conversions = require('../../../lib/utils/conversions');

describe('test utils conversions', () => {
  test('test stringifyJSON & parseJSON', () => {
    const expected = {one: 1, two: 2};
    const stringify = conversions.stringifyJSON(expected);
    const result = conversions.parseJSON(stringify);
    expect(result).toEqual(expected);
  });
});