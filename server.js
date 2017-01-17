const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongo = require('./db');

let db = null;
let app = express();

mongo.connect();

// middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Check token on page load
app.use('/', async function(req, res, next){

  if (req.path !== '/') {
    return next();
  }

  let token = req.query.token;

  // Pusty token w url
  if (!token) {
    return res.redirect('invalid.html');
  }

  // Brak tokeny w brazie
  if (!(await mongo.getDb().collection('tokens').findOne({_id: token}))) {
    return res.redirect('invalid.html');
  }

  next();

});

// Strony statyczne
app.use(express.static(path.join(__dirname, 'public')));

// Wysyłka formularza
app.post('/submission', async function(req, res, next) {

  let submission = req.body;
  let token = submission.token;
  delete submission.token;

  try {
    // Search and remove token in database
    let tokenResult = await mongo.getDb().collection('tokens').remove({_id: token});

    // If token not found, redirect
    if (tokenResult.result.n !== 1) {
      return res.redirect('invalid.html');
    }

    // If token found, save submission
    await mongo.getDb().collection('submissions').insertOne(submission);

  } catch (e) {
    return next(e);
  }

  return res.redirect('sent.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
