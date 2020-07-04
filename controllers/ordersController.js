const Order = require("../models/Order");
const createError = require("http-errors");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } 
  catch (err) { next(err) }
};
  
exports.addOrder = async (req, res, next) => {
  // pass in sent body fields into a new order
  try {
    const orderNew = await Order.create(req.body)
    res.send(orderNew);
  }
  catch(err) { next(err) }
};

exports.getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
    if(!order) {
      throw new createError.NotFound()
    }
    res.send(order)
  }
  catch(err) { next(err) }
};

exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderUpdated = await Order.findByIdAndUpdate(id, req.body, { new: true })
    if(!orderUpdated) {
      throw new createError.NotFound()
    }
    res.send(orderUpdated);
  }
  catch(err) { next(err) }
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderDeleted = await Order.findByIdAndDelete(id)
    if(!orderDeleted) {
      throw new createError.NotFound()
    }
    res.send(orderDeleted);
  }
  catch(err) { next(err) }
};
