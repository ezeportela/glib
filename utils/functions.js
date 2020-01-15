const {getError} = require('./errorHandler');

const originIsInCORS = (req, res, cors) => {
  if (cors.length == 0) return;

  const url = cors.filter((url) => url === req.headers.origin);

  if (url) res.set('Access-Control-Allow-Origin', url);
};

const createResponse = ({success, err, data, isProd, details}) => ({
  success,
  error: err ? getError(err) : null,
  data,
  details: isProd ? details : null,
});

module.exports = {
  originIsInCORS,
  createResponse,
};
