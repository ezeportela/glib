const {getError} = require('./errorHandler');

const originIsInCORS = (req, res, cors) => {
  if (cors.length == 0) return;

  const url = cors.filter((url) => url === req.headers.origin);

  if (url) res.set('Access-Control-Allow-Origin', url);
};

const createResponse = ({success, err, data, isProd, details}) => {
  const result = {success, data};

  if (isProd) {
    Object.assign(result, {
      ...result,
      details,
    });
  }

  if (err && err.code) {
    Object.assign(result, {
      ...result,
      error: getError(err.code),
    });
  }

  return result;
};

module.exports = {
  originIsInCORS,
  createResponse,
};
