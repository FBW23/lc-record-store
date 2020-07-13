const User = require('../models/User');
const createError = require('http-errors');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password -__v') // hide password (!) field when sending user info to client
      .sort('lastName')
      .limit(5);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const userNew = await User.create(req.body);
    res.send(userNew);
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
