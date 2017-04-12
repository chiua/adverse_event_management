const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
//what does the above statement do?
app.use(bodyParser.urlencoded({ extended: false }));
//what does the above statement do?
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next()
})

app.use('/', api);
//so you can create routes from the api

const port =  process.env.PORT || '3000';
//get it from environment variables or set it as 3000
app.set('port', port);


const server = http.createServer(app);
//create the server with the config values

server.listen(port, () => console.log(`API running on localhost:${port}`));




