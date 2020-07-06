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

router
  .route('/')
  .get(getUsers)
  .post(validationRules(), validateUser, addUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
