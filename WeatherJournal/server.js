// Empty JS object to act as endpoint for all routes
projectData = {};

// Express will begin to run server and routes
const express = require('express');

//Start up an instance of the application
const app = express();

/* Dependencies below */
const bodyParser = require('body-parser')

/* Middleware */
// Config Express to use body-parser as middle-ware!
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Le port used
const port = 8000;

//Spin up the server!
const server = app.listen(port, listening);

// const server = app.listen(port, ()=>{console.log('running on localhost: ${port}')})
// Callback to debug
function listening() {
  console.log('Server is alive!');
  console.log(`Running on localhost: ${port}`); // NOTE: USE `` and NOT ''
}

//GET route
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

app.post('/add', callBack);
function callBack (request, response) {
  projectData.push(request.body);
  response.send(true);
}
