const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
var createError = require('http-errors');

exports.getRecords = (req, res, next) => {
  const records = db.get('records').value();
  res.status(200).send(records);
};

exports.addRecord = (req, res, next) => {
  const record = req.body;
  db.get('records')
    .push({ ...record, ...{ id: Date.now().toString() } })
    .write();
  res.status(200).send(record);
};

exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db.get('records').find({ id: id }).value();
  if (!record) {
    const error = createError(
      400,
      `There is no record with the id of ${id} dumboooo`
    );
    next(error);
  }

  res.status(200).send(record);
};

exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  const newRecord = req.body;
  const record = db
    .get('records')
    .find({ id: id })
    .assign({ title: newRecord.title })
    .write();
  res.status(200).send(record);
};

exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db.get('records').remove({ id: id }).write();
  res.status(200).send(record);
};
