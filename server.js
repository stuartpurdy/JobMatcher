// server.js
const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 9000; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});