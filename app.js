var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('hello world'); // send text response
});

var client = require('./client');

app.get('/message', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  client.getMessage(function(msg) {
  	res.write(JSON.stringify(msg));
  });
});

app.get('/messagelist', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  client.getMessageList(function(msgList) {
  	res.write(JSON.stringify(msgList));
  });
});

app.get('/send', function(req, res) {
  client.send();
  res.writeHead(200);
});


app.listen(3000);
module.exports = app;
