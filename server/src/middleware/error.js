function notFound(req, res, _next) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  let status = err.status;
  if (!status) {
    if (err.name === 'ValidationError' || err.name === 'CastError') status = 400;
    else if (err.code === 11000) status = 409;
    else status = res.statusCode >= 400 ? res.statusCode : 500;
  }
  res.status(status).json({
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}

module.exports = { notFound, errorHandler };
