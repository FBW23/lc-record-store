var express = require('express');
var router = express.Router();
const {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordsController');

router.route('/').get(getRecords).post(addRecord);

router
  .route('/:id')
  .get(getRecord)
  .put(updateRecord)
  .delete(deleteRecord);

module.exports = router;
