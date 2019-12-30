const {stringifyJSON, parseJSON, parseResponse} = require('../../src/utils/conversions');

describe('test utils > conversions', () => {
  it('test stringifyJSON & parseJSON', () => {
    const expected = {one: 1, two: 2};
    const stringify = stringifyJSON(expected);
    const result = parseJSON(stringify);
    expect(result).to.eql(expected);
  });

  it('test parseResponse', () => {
    const expected = {one: 1, two: 2};
    const response = {text: stringifyJSON(expected)};
    const result = parseResponse(response);
    expect(result).to.eql(expected);
  });
});
