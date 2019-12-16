const {stringifyJSON, parseJSON, parseResponse} = require('../../src/utils/conversions');

describe('test utils conversions', () => {
  test('test stringifyJSON & parseJSON', () => {
    const expected = {one: 1, two: 2};
    const stringify = stringifyJSON(expected);
    const result = parseJSON(stringify);
    expect(result).toEqual(expected);
  });

  test('test parseResponse', () => {
    const expected = {one: 1, two: 2};
    const response = {text: stringifyJSON(expected)};
    const result = parseResponse(response);
    expect(result).toEqual(expected);
  });
});