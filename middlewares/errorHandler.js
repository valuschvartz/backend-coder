const errorDictionary = require('../routes/errorDictionary');

const errorHandler = (err, req, res, next) => {
  const fallbackError = errorDictionary.INTERNAL_SERVER_ERROR;

  // Buscamos por código o usamos el genérico
  const matchedError = errorDictionary[err.code] || fallbackError;

  const { code, message, status } = matchedError;

  const errorResponse = {
    status: 'error',
    message,
    code
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(status || 500).json(errorResponse);
};

module.exports = errorHandler;