const projectData = {}

//const dotenv = require('dotenv');   TODO: USE MEEEEEE
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors  GOOGLE ME FOR MORE EXPLAINATION
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));
//Look for asset files in dist (instead of client)
//app.use(express.static('src/client'))
console.log("Dir is: " + __dirname);


// Home route of index file
app.get('/', function(req, res) {
  //res.sendFile(path.resolve('src/client/views/index.html'))
  res.sendFile('dist/index.html');
});


// DELETE This or replace with something else
app.get('/test', function(req, res) {
  //  res.send(mockAPIResponse)
});

// designates what port the app will listen to for incoming requests
const portNumber = 3000;
app.listen(portNumber, function() {
  console.log(`Server running on port ${portNumber}`);
});



console.log("Server is alive! 0.o");


  //Example Code: http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=91790&maxRows=10&username=bleu23
