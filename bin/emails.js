const db = require('../db');
const crypto = require('crypto');

let mailgunApiKey = process.env.MAILGUN_API_KEY;
let mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: 'mg.miastojestnasze.org'});

let baseUrl = process.env.PAGE_URL;

let message = `Droga koleżanko, drogi kolego,

Poniżej znajdziesz swój osobisty link do ankiety.

Z poważaniem,
Zarząd MJN

****

`;

if (process.argv.length < 2) {
  console.log('Please provide emails');
  process.exit();
}

let emails = process.argv[process.argv.length-1].split(',');

async function sendEmails(db) {

  // Generate tokens
  let tokens = emails.map((e) => crypto.randomBytes(6).toString('hex'));

  // Remove existing tokens and add new
  await db.collection('tokens').remove();
  await db.collection('tokens').insertMany(tokens.map((token) => ({_id: token})));

  // Send emails with tokens
  return await Promise.all(emails.map((email, index) => {
    let data = {
      from: 'Miasto Jest Nasze <zarzad@miastojestnasze.org>',
      to: email,
      subject: 'Link do ankiety',
      text: message + baseUrl + '/?token=' + tokens[index]
    };
    console.log('Sending email to %s', email);
    return mailgun.messages().send(data);
  }));

}

db.connect(function(err, db){
  if (err) {
    console.error(err);
    process.exit();
  }
  sendEmails(db).then(function(res){
    console.log(res);
    process.exit();
  }, function(err) {
    console.log(err);
    process.exit();
  });
});