var express = require('express');
var router = express.Router();
const {
  getOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersController');
const auth = require('../middleware/authenticator');

router.route('/').get(auth, getOrders).post(auth, addOrder);

router
  .route('/:id')
  .get(auth, getOrder)
  .put(auth, updateOrder)
  .delete(auth, deleteOrder);

module.exports = router;
