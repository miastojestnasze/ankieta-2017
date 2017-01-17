const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Sendgrid  = require('sendgrid');
const mongodb = require('mongodb');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/ankieta';
const sendgridApiKey = process.env.SENDGRID_API_KEY || 'ASDFGHJK';

let app = express();
let mongoDb = null;
let sendgrid = Sendgrid(sendgridApiKey);

// ------------------------------------------------------

mongodb.MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    throw err;
  }
  mongoDb = db;
  console.log('Connected successfully to MongoDB server');
});

// ------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Sprawdzanie tokenóe na wejściu
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
  if (!(await mongoDb.collection('tokens').findOne({_id: token}))) {
    return res.redirect('invalid.html');
  }

  next();

});

// Strony statyczne
app.use(express.static(path.join(__dirname, 'public')));

// Wysyłka maili - strona
app.get('/emails', function (req, res) {
  res.render('emails');
});

// Wysyłka maili - mechanizm
app.post('/emails', async function (req, res, next) {

  let message = req.body.message;

  // Pobierz adresy email
  let emails = req.body.emails.split('\n').map((e) => e.trim()).filter((e) => e.length);

  // Wygeneruj tokeny
  let tokens = emails.map((e) => crypto.randomBytes(6).toString('hex') ).map((token) => ({_id: token}));

  try {
    await mongoDb.collection('tokens').remove();
    await mongoDb.collection('tokens').insertMany(tokens);
  } catch (e) {
    return next(e);
  }

  let emailsResult;

  try {
    emailsResult = await Promise.all(emails.map((email, index) => {
      let options = {
        'track_opens': false,
        'track_clicks': false,
        'auto_text': true,
        'auto_html': true,
        'url_strip_qs': true,
        'text': message + '\n\n http://ankieta-2017.miastojestnasze.org/?token=' + tokens[index],
        'subject': 'Link do ankiety',
        'from': 'kontakt@miastojestnasze.org',
        'fromName': 'Miasto Jest Nasze',
        'headers': {
          'Reply-To': 'zarzad@miastojestnasze.org'
        },
        'to': email,
        'toname': email
      };
      let sendgridEmail = new sendgrid.Email(options);
      return sendgrid.send(sendgridEmail);
    }));
  } catch (e) {
    return next(e)
  }

  res.render('emails-confirmation', {emails: emails});

});

// Wysyłka formularza
app.post('/submission', async function(req, res, next) {

  let submission = req.body;
  let token = submission.token;
  delete submission.token;

  try {
    // Search and remove token in database
    let tokenResult = await mongoDb.collection('tokens').remove({_id: token});

    // If token not found, redirect
    if (tokenResult.result.n !== 1) {
      return res.redirect('invalid.html');
    }

    // If token found, save submission
    await mongoDb.collection('submissions').insertOne(submission);

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
  res.render('error');
});


module.exports = app;
