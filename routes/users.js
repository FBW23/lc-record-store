var express = require('express');
var router = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

// GET ALL RECORDS /records/
router.get('/', getUsers);

//CREATE A RECORD /records/
router.post('/', addUser);

// GET A SPECIFIC RECORD /records/:id
router.get('/:id', getUser);

// UPDATE A RECORD  /records/:id
router.put('/:id', updateUser);

// DELETE A RECORD /records/:id
router.delete('/:id', deleteUser);

module.exports = router;
