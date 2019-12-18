const jwtDecode = require('jwt-decode');
const {createError, errorHandler} = require('../utils/errorHandler');

const validateToken = (check, col, cols, pipe = (text) => text) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwtDecode(token);

      if (decoded.gty === 'client-credentials') return next();

      if (!cols.some((_col) => decoded[_col] === pipe(req[check][col]))) createError('unauthorized');

      next();
    } catch (err) {
      errorHandler(err);
    }
  };

module.exports = validateToken;
