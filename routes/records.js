var express = require('express');
var router = express.Router();
const { getRecords } = require('../controllers/recordsController');

// /records
router.get('/', getRecords);

module.exports = router;
