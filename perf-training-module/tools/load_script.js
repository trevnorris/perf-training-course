var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var data = fs.readFileSync(__dirname + '/data_entries.json');
var entries = JSON.parse(data);

var config = require('./config.js');

MongoClient.connect(config.mongodb.path, function(err, db) {
  if (err)
    throw err;

  db.dropDatabase(function(err) {
    if (err)
      throw err;

    db.createCollection('users', function(err, users) {
      if (err)
        throw err;

      var user_data = entries.user_data;
      (function insertRecord(cntr) {
        users.insert(user_data[cntr], function(err) {
          if (err)
            throw err;

          if (cntr < user_data.length - 1)
            insertRecord(++cntr);
          else
            db.close();
        });
      }(0));
    });
  });
});
