const { HTTP_STATUS } = require('../constants');
const { sendError } = require('../utils/responseHelper');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(HTTP_STATUS.NOT_FOUND);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === HTTP_STATUS.OK
      ? HTTP_STATUS.INTERNAL_SERVER_ERROR
      : res.statusCode;

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    return sendError(res, HTTP_STATUS.CONFLICT, 'Duplicate field value entered', [
      { field: Object.keys(err.keyValue)[0], msg: 'Already exists' },
    ]);
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => ({
      [val.path]: val.message,
    }));
    return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Validation failed', errors);
  }

  // Handle CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Resource not found', [
      { msg: `Invalid ${err.path}: ${err.value}` },
    ]);
  }

  const isProduction = process.env.NODE_ENV === 'production';
  return sendError(
    res,
    statusCode,
    err.message || 'Internal Server Error',
    isProduction ? null : err.stack
  );
};

module.exports = {
  notFound,
  errorHandler,
};
