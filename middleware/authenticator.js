const User = require('../models/User');
const createError = require('http-errors');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    const user = await User.findByToken(token);
    if (!user) throw new createError.Unauthorized();

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
