const express = require('express');
const router = express.Router();
const {
  validationRules,
  validateUser,
} = require('../middleware/validator');

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/usersController');

const auth = require('../middleware/authenticator');
const isAdmin = require('../middleware/authorizer');

router
  .route('/')
  .get(auth, isAdmin, getUsers) // chaining middleware
  .post(validationRules(), validateUser, addUser);

router
  .route('/login')
  .post(validationRules(), validateUser, loginUser)

router
  .route('/:id')
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
