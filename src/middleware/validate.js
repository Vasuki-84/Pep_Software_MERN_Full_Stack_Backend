const { validationResult } = require('express-validator');
const { HTTP_STATUS } = require('../constants');
const { sendError } = require('../utils/responseHelper');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return sendError(
    res,
    HTTP_STATUS.UNPROCESSABLE_ENTITY,
    'Validation failed',
    extractedErrors
  );
};

module.exports = validate;
