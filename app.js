/**EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');

/** INIT */
const app = express();
console.log('Server is up and running...');

/** LOGS*/
app.use(logger('dev'));

/** CORS */
app.use(cors());

/**SETUP LOWDB */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ records: [], users: [], orders: [] }).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** STATIC FILES */
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
// freaks.edu
// freaks.edu/api/
// api.freaks.edu
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);

module.exports = app;
