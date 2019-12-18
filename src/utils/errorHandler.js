const requireDependency = require('./requireDependency');

const getError = (err) => {
  const errorCodes = requireDependency('/config/error.codes.json');
  const row =
    errorCodes.errors.filter((error) =>
      error.code === err.code)[0];

  if (row) return row;

  return err;
};

const createError = (code) => {
  const error = new Error();
  error.code = code;
  throw error;
};

const errorHandler = (err, defaultError) => {
  if (err.statusCode == 401) err.code = 'unauthorized';

  if (!err.code) err.code = defaultError;

  const error = getError(err);

  throw error;
};

const resolveError = (err, res) => {
  err = getError(err);

  const {status} = err;

  delete err.status;
  res.status(status || 500).send(err);
};

module.exports = {
  createError,
  errorHandler,
  resolveError,
};
