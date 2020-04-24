const projectData = {}

const dotenv = require('dotenv');
dotenv.config();
const mockAPIResponse = require('./mockAPI.js')
const express = require('express');
const path = require('path');
const aylien = require('aylien_textapi');
const bodyParser = require('body-parser');

// Alyian API ! :D
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

//Middleware
const app = express();
app.use(bodyParser.urlencoded({ exteended: false }));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));
console.log("Dir of server: " + __dirname);

// the Get
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

// Get with test
app.get('/test', function(req, res) {
  res.send(mockAPIResponse);
})

// designates what port the app will listen
const portNumber = 8081;
app.listen(portNumber, function() {
  console.log(`Example app listening on port ${portNumber}`);
});

//Post request
app.post('/sentiment', function(req, res) {
  textapi.sentiment({
    'url': req.body.url
  }, function(error, response) {
    if (error === null) {
      //Output data retrieved from Aylien API
      console.log(response);
      res.send(response);
      };
  });
});

console.log("Server is Live 0.0");
