const jwtDecode = require('jwt-decode');
const {createError, handleError} = require('../utils/errorHandler');

const validateTokenProps = (
  check,
  col,
  claims,
  pipe = (text, claim) => text,
) => (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);

    if (decoded.gty === 'client-credentials') return next();

    if (
      !claims.some((claim) => decoded[claim] === pipe(req[check][col], claim))
    ) {
      createError('unauthorized');
    }

    return next();
  } catch (err) {
    handleError(err);
  }
};

module.exports = validateTokenProps;
