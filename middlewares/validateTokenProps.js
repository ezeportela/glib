const jwtDecode = require('jwt-decode');
const {createError, handleError} = require('../utils/errorHandler');

const validateTokenProps = (check, cols, claims, pipe = (text) => text) => (
  req,
  res,
  next,
) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);

    if (decoded.gty === 'client-credentials') return next();

    const results = [];
    for (const col of cols) {
      results.push(
        req[check][col] &&
          claims.some((claim) => decoded[claim] === pipe(req[check][col], col)),
      );
    }

    if (results.every((result) => !result)) createError('unauthorized');

    return next();
  } catch (err) {
    handleError(err);
  }
};

module.exports = validateTokenProps;
