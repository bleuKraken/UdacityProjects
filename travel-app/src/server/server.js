const projectData = {}

//const dotenv = require('dotenv');   TODO: USE MEEEEEE
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const request = require('request-promise');


console.log(`Your API key is ${process.env.WEATHERBIT_KEY}`);


const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
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


// FIRST Post Route - Travel data form / Validation
app.post('/travel',
  (req, res) => {
    req.body.status = "SUCCESS"
    req.body.error = ""
    processTravelData(req, res)
  })
// Process travel data - Validate Input, call APIs, return weather data, image link, errors
async function processTravelData(req, res) {
  let cityCodes = "a";
  let cityName;
  let cityNames = "a";

  // get location from Geonames API and fetch first entry
  let geonamesURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + req.body.countryname + '&country=' + req.body.country + '&cmaxRows=1000&username=bleu23'
  await request(geonamesURL, function(err, response, body) {
    let countryData = JSON.parse(body);
    // Array to hold all the cities
    for (counter = 0; counter < countryData.postalCodes.length - 1; counter++) {
      // Removes duplicates from cities and areas next to each other
      if (countryData.postalCodes[counter].adminName1 === countryData.postalCodes[counter + 1].adminName1) {
        counter++
      } else {
        cityNames = cityNames + "," + countryData.postalCodes[counter].adminName1;
        cityCodes = cityCodes + "," + countryData.postalCodes[counter].postalCode;
        console.log(cityNames)
        console.log(cityCodes)
      }
    }
  });
  let travelData = {
    country: req.body.country,
    citynames: cityNames,
    citycodes: cityCodes
  }
  console.log('::: POST Data :::')
  return res.send(travelData);
}


// SECOND Post Route - Travel data form / Validation
app.post('/travel-location',
  (req, res) => {
    req.body.status = "SUCCESS"
    req.body.error = ""
    processLocationData(req, res)
  })

// Process tlocation data
async function processLocationData(req, res) {
  let latitude;
  let longitude;
  // get location from Geonames API and fetch first entry
  let cityInfoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + req.body.city + '&postalcode=' + req.body.citycode + '&cmaxRows=1000&username=bleu23'
  await request(cityInfoURL, function(err, response, body) {
    let cityData = JSON.parse(body);
    latitude = cityData.postalCodes[0].lat;
    longitude = cityData.postalCodes[0].lng;
  });



  // Variables used for weather bit API, get weather conditions
  let cityName;
  let weatherDate = [];
  let weatherDiscription = [];
  let temp = [];
  let minTemp = [];
  let maxTemp = [];
  let weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&key=' + process.env.WEATHERBIT_KEY
  await request(weatherbitURL, function(err, response, body) {
    let weatherData = JSON.parse(body);
    // Grab vars from server, yee!
    cityName = weatherData.city_name;



    console.log("strarting..")
    // SENDING DATA FROM HERE TO BE POPULATED
    for(let count = 0; count <= 15; count++){
      weatherDate[count] = weatherData.data[count].valid_date;
      weatherDiscription[count] =  weatherData.data[count].weather.description;
      temp[count] = weatherData.data[count].temp;
      minTemp[count] = weatherData.data[count].min_temp;
      maxTemp[count] = weatherData.data[count].max_temp;
    }

    console.log("Finsihed")
    console.log("yee");
  });
  // Variables that will populate page
  let weatherInfo = {
    weatherdate: weatherDate,
    description: weatherDiscription,
    temperature: temp,
    mintemp: minTemp,
    maxtemp: maxTemp,
    name: cityName
  }

  console.log('::: POST Data :::')
  return res.send(weatherInfo);
}


//Example Code: http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=91790&maxRows=10&username=bleu23
