var createError = require('http-errors');

exports.handleErrorPaths = (req, res, next) => {
  const error = createError(
    404,
    `There is not a route '${req.url}' my friend here`
  );

  next(error);
};
