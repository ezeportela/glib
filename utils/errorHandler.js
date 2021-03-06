const requireDependency = require('./requireDependency');

const getError = (err) => {
  const errorCodes = requireDependency('/config/error.codes.json');
  const row =
    errorCodes.errors.filter((error) =>
      error.code === err.code)[0];

  if (row) return row;

  err.code = 'internal_server_error';
  err.message = 'Internal Server Error';
  err.severity = 'HIGH';
  return err;
};

const createError = (code) => {
  const error = new Error();
  error.code = code;
  throw error;
};

const handleError = (err, defaultError) => {
  if (err.statusCode == 401) err.code = 'unauthorized';

  if (!err.code) err.code = defaultError;

  const error = getError(err);

  throw error;
};

const resolveError = (err, res, isProd = true, {code, severity} = {}) => {
  if (isProd) {
    err = getError(err);
    const {status} = err;

    const error = new Error();
    const {code, message, severity} = err;
    error.success = false;
    error.error = {code, message, severity};
    res.status(status || 500).send(error);
  } else {
    const error = new Error();
    error.success = false;
    error.error = {code, message: err.message, severity};
    throw error;
  }
};

module.exports = {
  getError,
  createError,
  handleError,
  resolveError,
};
