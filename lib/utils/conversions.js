const stringifyJSON = (json) => JSON.stringify(json);

const parseJSON = (text) => JSON.parse(text);

const parseResponse = (response) => parseJSON(response.text);

module.exports = {
  stringifyJSON,
  parseJSON,
  parseResponse,
};
