function notFound(req, res, _next) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  const status = err.status || res.statusCode >= 400 ? res.statusCode : 500;
  const code = status === 200 ? 500 : status;
  res.status(code).json({
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}

module.exports = { notFound, errorHandler };
