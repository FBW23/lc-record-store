const User = require('../models/User');
const createError = require('http-errors');

const loginDuration = 900000; // => 15 * 60 * 1000 => 15 minutes

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-__v') // hide password (!) field when sending user info to client
      .sort('lastName')
      .limit(5);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Receive email and password
 * Check for a user with that email & password
 * - compare password hashes
 * Create a JWT token
 * Return it to the user as a cookie
 */
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body; // we receive password as plain text

  let user = await User.findOne({ email });

  // user with that email does not exist
  if (!user) {
    next(
      new createError.Unauthorized(
        'User with given email does not exist'
      )
    );
  }

  // check passwords
  if (!user.checkPw(password)) {
    next(
      new createError.Unauthorized('Password do not match')
    );
  }

  // user is know to us
  const token = user.generateToken();

  res
    .cookie('authToken', token, {
      expires: new Date(Date.now() + loginDuration),
    })
    .send(user);
};

exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);

    await user.save();
    const token = user.generateToken();

    res
      .cookie('authToken', token, {
        expires: new Date(Date.now() + loginDuration),
      })
      .send(user);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.params.id).select(
      '-password -__v'
    );
    if (!user) {
      throw new createError.NotFound();
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!userUpdated) {
      throw new createError.NotFound();
    }
    res.send(userUpdated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) {
      throw new createError.NotFound();
    }
    res.send(userDeleted);
  } catch (err) {
    next(err);
  }
};
