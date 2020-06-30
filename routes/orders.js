var express = require('express');
var router = express.Router();
const {
  getOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersController');

router.route('/').get(getOrders).post(addOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
