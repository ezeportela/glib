const conversions = require('./conversions');
const errorHandler = require('./errorHandler');
const requireDependency = require('./requireDependency');
const {originIsInCORS} = require('./functions');

module.exports = {
  conversions,
  errorHandler,
  requireDependency,
  originIsInCORS,
};
