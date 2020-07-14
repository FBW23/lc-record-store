var express = require('express');
var router = express.Router();
const {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordsController');
const auth = require('../middleware/authenticator');

router.route('/').get(getRecords).post(auth, addRecord);

router
  .route('/:id')
  .get(getRecord)
  .put(auth, updateRecord)
  .delete(auth, deleteRecord);

module.exports = router;
