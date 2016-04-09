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
  console.log('message', client.getMessage());
  res.write(JSON.stringify(client.getMessage()));
});

app.get('/messagelist', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  console.log('messagelist', client.getMessageList());
  res.write(JSON.stringify(client.getMessageList()));
});

app.get('/send', function(req, res) {
  client.send();
  res.writeHead(200);
});


app.listen(3000);
module.exports = app;
