const projectData = {}

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const request = require('request-promise');

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));

// Home route of index file
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', function(req, res) {
  res.send(mockAPIResponse)
});

// designates what port the app will listen to for incoming requests
const portNumber = 3000;
app.listen(portNumber, function() {
  console.log(`Server running on port ${portNumber}`);
});
console.log("Server is alive! 0.o");

// FIRST Post Route - Travel data
app.post('/travel',
  (req, res) => {
    req.body.status = "SUCCESS"
    req.body.error = ""
    processTravelData(req, res)
  })
// Process travel data - Validate Input, call APIs, return weather data, image link, errors
async function processTravelData(req, res) {
  let cityCodes = [],
    cityNames = [];
  let duplicate = false;
  let cityPosition;

  // get location from Geonames API and fetch first entry
  let geonamesURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + req.body.countryname + '&country=' + req.body.country + '&cmaxRows=1000&username=bleu23'
  console.log("GeoNames Link: " + geonamesURL)
  await request(geonamesURL, function(err, response, body) {
    let countryData = JSON.parse(body);
    console.log("Sorting through GEONAMES data...")
    cityPosition = 0;
    // Look through city names from API response, and pull each unique city name.
    for (let count = 0; count < countryData.postalCodes.length - 1; count++) {
      if (countryData.postalCodes[count].adminName1 === countryData.postalCodes[count + 1].adminName1) {
        duplicate = true;
      }
      if (!duplicate) {
        cityCodes[cityPosition] = countryData.postalCodes[count].postalCode;
        cityNames[cityPosition] = countryData.postalCodes[count].adminName1;
        cityPosition++;
      }
      duplicate = false;
    }
  });

  // Data that will be sent to FormHandler
  let travelData = {
    country: req.body.country,
    citynames: cityNames,
    citycodes: cityCodes,
    cityposition: cityPosition
  }
  console.log('::: POST GEONAMES DATA :::')
  return res.send(travelData);
}

// SECOND Post Route - Travel data / Location Data / Picture Data
app.post('/travel-location',
  (req, res) => {
    req.body.status = "SUCCESS"
    req.body.error = ""
    processLocationData(req, res)
  })

// Process location data
async function processLocationData(req, res) {
  let cityNameSelected = req.body.city;
  let latitude, longitude;
  // get location from Geonames API and fetch first entry
  let cityInfoURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + req.body.city + '&postalcode=' + req.body.citycode + '&cmaxRows=1000&username=' + process.env.GEONAMES_KEY
  console.log("GeoNames of city Link: " + cityInfoURL)
  await request(cityInfoURL, function(err, response, body) {
    let cityData = JSON.parse(body);
    latitude = cityData.postalCodes[0].lat;
    longitude = cityData.postalCodes[0].lng;
  });

  // Variables used for weather bit API, get weather conditions
  let weatherDate = [], weatherDiscription = [], temp = [], minTemp = [], maxTemp = [];
  let cityPhoto;
  // WeatherBIT URL request
  let weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&key=' + process.env.WEATHERBIT_KEY
  console.log("Weather Link: " + weatherbitURL)
  await request(weatherbitURL, function(err, response, body) {
    let weatherData = JSON.parse(body);
    // Fill arrays with data for the next 16 days
    for (let count = 0; count <= 15; count++) {
      weatherDate[count] = weatherData.data[count].valid_date;
      weatherDiscription[count] = weatherData.data[count].weather.description;
      temp[count] = weatherData.data[count].temp;
      minTemp[count] = weatherData.data[count].min_temp;
      maxTemp[count] = weatherData.data[count].max_temp;
    }
  });
  // Replace SPACES with + sign for PIXABAY URL
  let cityPhotoString = cityNameSelected.replace(/ /g, "+");
  let pixabayURL = 'https://pixabay.com/api/?key=' + process.env.PIXABAY_KEY + '&q=city+of+' + cityPhotoString + '&image_type=photo'
  console.log("Pixabay Link: " + pixabayURL)
  await request(pixabayURL, function(err, response, body) {
    let pixabayData = JSON.parse(body);
    // Photo link of city
    cityPhoto = pixabayData.hits[0].webformatURL;
  });

  // Variables that will populate page
  let weatherInfo = {
    weatherdate: weatherDate,
    description: weatherDiscription,
    temperature: temp,
    mintemp: minTemp,
    maxtemp: maxTemp,
    photo: cityPhoto
  }

  console.log('::: POST Data :::')
  return res.send(weatherInfo);
}
