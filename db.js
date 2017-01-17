let mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/ankieta';
let MongoClient = require( 'mongodb' ).MongoClient;
let _db;

module.exports = {

  connect: function(callback) {
    MongoClient.connect(mongoUrl, function( err, db ) {
      _db = db;
      if (callback) {
        callback(err, db);
      }
    });
  },

  getDb: function() {
    return _db;
  }
};
