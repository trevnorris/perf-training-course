var MongoClient = require('mongodb').MongoClient;
var server = require('./lib/server.js');
var config = require('./tools/config.js');

MongoClient.connect(config.mongodb.path, function mongoConnect(err, db) {
  if (err)
    throw err;

  server.launch(config, db);
});

