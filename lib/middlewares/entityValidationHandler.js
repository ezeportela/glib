const Joi = require('joi');
const {createError, errorHandler} = require('../utils/errorHandler');

const validate = (data, schema) => {
  const {error} = Joi.validate(data, schema);
  return error;
};

const validationHandler = (schema, check = 'body', errCode) => {
  return (req, res, next) => {
    try {
      const error = validate(req[check], schema);

      if (error) {
        createError(errCode);
      }

      next();
    } catch (err) {
      errorHandler(err);
    }
  };
};

module.exports = validationHandler;
