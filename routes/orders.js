var express = require('express');
var router = express.Router();
const {
  getOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersController');

// GET ALL RECORDS /orders/
router.get('/', getOrders);

//CREATE A RECORD /orders/
router.post('/', addOrder);

// GET A SPECIFIC RECORD /orders/:id
router.get('/:id', getOrder);

// UPDATE A RECORD  /orders/:id
router.put('/:id', updateOrder);

// DELETE A RECORD /orders/:id
router.delete('/:id', deleteOrder);

module.exports = router;
