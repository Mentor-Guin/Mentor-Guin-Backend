function notFoundHandler(_req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist.',
  });
}

function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  res.status(status).json({
    error: status === 404 ? 'Not Found' : 'Internal Server Error',
    message: error.message || 'Something went wrong',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
