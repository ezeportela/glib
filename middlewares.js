const entityValidationHandler = require('../src/middlewares/entityValidationHandler');
const validateTokenProps = require('../src/middlewares/validateTokenProps');
const validateTokenValid = require('./src/middlewares/validateTokenValid');

module.exports = {
  entityValidationHandler,
  validateTokenProps,
  validateTokenValid,
};
