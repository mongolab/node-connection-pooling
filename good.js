var express = require('express');
var mongodb = require('mongodb');
var logger = require('./logger.js');
var app = express();

var MONGODB_URI = 'mongodb://localhost';
var db;
var coll;

// Initialize connection once, reuse the database object 

mongodb.MongoClient.connect(MONGODB_URI, { server: { logger: logger(MONGODB_URI) } }, function(err, database) {
  if(err) throw err;
 
  db = database;
  coll = db.collection('test');

  app.listen(3000);
  console.log('Listening on port 3000');
});

app.get('/', function(req, res) { 
  coll.find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        res.write(JSON.stringify(doc) + "\n");
      }
      else {
        res.end();
      }
    });
  });
});

app.get('/post', function(req, res) {
  coll.insert({ randomNumber: Math.random() }, function(err) {
    res.end('Successful Insert!');
  })
});
  
