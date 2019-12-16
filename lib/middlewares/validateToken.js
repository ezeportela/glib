const jwtDecode = require('jwt-decode');
const {createError, errorHandler} = require('../../../lib/errorHandler');

const validateTokenIdentity = (check, col, cols) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwtDecode(token);

      if (decoded.gty === 'client-credentials') return next();

      if (!cols.some((_col) => decoded[_col] === `auth0|${req[check][col]}`)) createError('unauthorized');

      next();
    } catch (err) {
      errorHandler(err);
    }
  };

module.exports = validateTokenIdentity;
