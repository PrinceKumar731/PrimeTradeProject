export const errorHandler = (error, req, res, next) => {
  let normalizedError = error;

  if (error.name === 'ValidationError') {
    normalizedError = {
      statusCode: 400,
      message: 'Validation failed',
      details: {
        errors: Object.values(error.errors).map((issue) => ({
          field: issue.path,
          message: issue.message,
        })),
      },
    };
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue || {})[0];
    normalizedError = {
      statusCode: 409,
      message: `${duplicateField} already exists`,
    };
  }

  if (error.name === 'CastError') {
    normalizedError = {
      statusCode: 400,
      message: `Invalid ${error.path}`,
    };
  }

  const statusCode = normalizedError.statusCode || 500;
  const message = normalizedError.message || 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(normalizedError.details && normalizedError.details),
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
};
