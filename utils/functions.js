const originIsInCORS = (req, cors) => {
  if (cors.length == 0) return true;

  return cors.some((url) => url === req.headers.origin);
};

module.exports = {
  originIsInCORS,
};
