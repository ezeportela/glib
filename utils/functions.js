const originIsInCORS = (req, res, cors) => {
  if (cors.length == 0) return;

  const url = cors.filter((url) => url === req.headers.origin);

  if (url) res.set('Access-Control-Allow-Origin', cors);
};

module.exports = {
  originIsInCORS,
};
