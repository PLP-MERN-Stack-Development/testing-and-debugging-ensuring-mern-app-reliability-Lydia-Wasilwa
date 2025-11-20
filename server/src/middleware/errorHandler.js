module.exports = function errorHandler(err, req, res, next) {
    console.error('Error middleware:', err);
    if (res.headersSent) return next(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };
  