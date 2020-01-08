const originIsInCORS = (req, res, cors) => {
  console.log('pre-function', req.headers, cors);
  if (cors.length == 0) return;

  const url = cors.filter((url) => url === req.headers.origin);
  console.log('function url', url);

  if (url) {
    console.log('set response header', url);
    res.set('Access-Control-Allow-Origin', url);
  }
};

module.exports = {
  originIsInCORS,
};
