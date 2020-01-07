const {createError, handleError} = require('../utils/errorHandler');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');

const validateTokenValid = (audiences) => (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwtDecode(token);

    if (decoded.exp < new Date().getTime() / 1000) createError('unauthorized');

    if (!_.isEmpty(audiences) && !audiences.some((audience) =>
      Array.isArray(decoded.aud) ?
        decoded.aud.some((_aud) => audience === _aud) :
        audience === decoded.aud,
    )) createError('unauthorized');

    return next();
  } catch (err) {
    handleError(err);
  }
};

module.exports = validateTokenValid;
