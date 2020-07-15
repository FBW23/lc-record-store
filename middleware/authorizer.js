const User = require('../models/User');
const createError = require('http-errors');

const isAdmin = async (req, res, next) => {
  console.log("[MIDDLEWARE] isAdmin", req.user)

  if(req.user.role != "Admin") {
    return next( new createError.Forbidden("You are not admin, this here is not kids territory!") ) // Forbidden: 403
  }
  next()
};

module.exports = isAdmin;
