var express = require('express');
var router = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

router.route('/').get(getUsers).post(CHCKDATA, addUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
