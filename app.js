/**EXTERNAL DEPENDENCIES */
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');
const { handleErrorPaths } = require('./middleware/errorPaths');

/** INIT */
const app = express();
console.log('Server is up and running...');

/** CONNECT TO DATABASE */
mongoose.connect("mongodb://localhost/record-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => "Connecton established")
.catch(console.error)


/** LOGS*/
app.use(logger('dev'));

/** CORS */
app.use(cors());

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

app.use(handleErrorPaths);

/**ERROR MIDDLEWARE */
// If anyone anywhere in the app calls next(error) then we end up here
app.use((err, req, res, next) => {
  const errCode = err.status || 500
  
  res.status(errCode).send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
