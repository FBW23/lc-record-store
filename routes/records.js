var express = require('express');
var router = express.Router();
const {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordsController');

// GET ALL RECORDS /records/
router.get('/', getRecords);

//CREATE A RECORD /records/
router.post('/', addRecord);

// GET A SPECIFIC RECORD /records/:id
router.get('/:id', getRecord);

// UPDATE A RECORD  /records/:id
router.put('/:id', updateRecord);

// DELETE A RECORD /records/:id
router.delete('/:id', deleteRecord);

module.exports = router;
