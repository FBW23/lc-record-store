var express = require('express');
var router = express.Router();
const { getRecords, addRecord } = require('../controllers/recordsController');

// /records
router.get('/', getRecords);
router.post('/', addRecord);

module.exports = router;
