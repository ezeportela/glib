const resMock = {
  json: (mock) => mock,
  status: (code) => {
    return {
      send: (mock) => mock,
    };
  },
};

module.exports = {
  resMock,
};
