const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  else if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((err) => err.message)
      .join(', ');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.status || 500).send({
    success: false,
    error: error.message || 'Server error'
  });
};

module.exports = errorHandler;
