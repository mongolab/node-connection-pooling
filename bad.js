var express = require('express');
var mongodb = require('mongodb');
var logger = require('./logger.js');
var app = express();

var MONGODB_URI = 'mongodb://localhost'

app.get('/', function(req, res) { 
  mongodb.MongoClient.connect(MONGODB_URI, { server: { logger: logger(MONGODB_URI) } }, function(err, db) {
  if(err) throw err;
  
  var coll = db.collection('test');

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
});

app.get('/post', function(req, res) {
  mongodb.MongoClient.connect(MONGODB_URI, { server: { logger: logger(MONGODB_URI) } }, function(err, db) {
    if(err) throw err;
  
    var coll = db.collection('test');

    coll.insert({ randomNumber: Math.random() }, function(err) {
      res.end('Successful Insert!');
    });
  });
});

app.listen(3000);
console.log('Listening on port 3000');

