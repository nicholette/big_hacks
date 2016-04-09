var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');
var app = express();
var config = require('./config');
var http = require('http');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('hello world'); // send text response
});

var client = require('./client');

app.get('/message', function(req, res) {
  client.getMessage(function(msg) {
  	res.setHeader('Content-Type', 'application/json');
  	res.writeHead(200);
  	res.end(JSON.stringify(msg));
  });
});

app.get('/messagelist', function(req,res) {
  client.getMessageList(function(msgList) {
  	res.setHeader('Content-Type', 'application/json');
  	res.writeHead(200);
  	res.end(JSON.stringify(msgList));
  });
});

app.get('/send', function(req, res) {
  client.send();
  res.writeHead(200);
});


app.listen(3000);
module.exports = app;
