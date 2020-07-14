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
} = require('../controllers/usersController');

const auth = require('../middleware/authenticator');

router
  .route('/')
  .get(auth, getUsers)
  .post(validationRules(), validateUser, addUser);

router
  .route('/:id')
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
