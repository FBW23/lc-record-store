const Record = require("../models/Record")
const createError = require('http-errors');
const { create } = require("../models/Record");

exports.getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.send(records);
  }
  catch (err) { next(err) }
};

exports.addRecord = async (req, res, next) => {

  // Assure that the user provides fields in the body...
  if (Object.keys(req.body).length === 0) {
    const err = createError.BadRequest(
      `You need to send the record info in the body of the request`
    );
    next(err);
  }

  try {
    const recordNew = await Record.create(req.body)
    res.send(recordNew);
  }
  catch(err) { next(err) }
};

exports.getRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const record = await Record.findById(id)
    if(!record) {
      throw new createError.NotFound()
    }
    res.send(record)
  }
  catch(err) { next(err) }
};

exports.updateRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordUpdated = await Record.findByIdAndUpdate(id, req.body, { new: true })
    if(!recordUpdated) {
      throw new createError.NotFound()
    }
    res.send(recordUpdated);
  }
  catch(err) { next(err) }
};

exports.deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordDeleted = await Record.findByIdAndDelete(id)
    if(!recordDeleted) {
      throw new createError.NotFound()
    }
    res.send(recordDeleted);
  }
  catch(err) { next(err) }
};
