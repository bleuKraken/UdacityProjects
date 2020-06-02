/* API's */
let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
let userName = '&cmaxRows=1000&username=bleu23';
let weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=';
let weatherbitKEY = '&key=5f07326cea2d40b5a96c398add84355d';
let pixabayURL = 'https://pixabay.com/api/';
let pixabayKEY = '?key=16333422-0d109d6b922e359855596f3e8';
// Global Vars
let latitude, longitude;

/* Event listener handleer */
function application(event) {
  event.preventDefault()

  // Get Data Selected
  let countryAreaContainer = document.getElementById('container-area');
  let countrySelected = document.getElementById('dropdown-country');
  let countryCode = countrySelected.options[countrySelected.selectedIndex].value;
  let countryName = countrySelected.options[countrySelected.selectedIndex].text;
  document.getElementById('final-country-name').innerHTML = countryName;

  // User is selecting a Country
  if (countryAreaContainer.classList.contains('hidden')) {
    const city = countryName;
    const code = '&country=' + countryCode;
    let dateSelected = document.getElementById('departure-date').value;
    // Check if date is selected
    if (dateSelected === ""){
      return(alert("Please select a date first."))
    }
    const tripDate = new Date(dateSelected).getTime();
    alert("Trip date " + tripDate)

    console.log("Date " + tripDate)
    /*Calls the function which calculates how soon the trip is */
    //UNCOMMENT BELOW LATER
    //const days = Client.daysCountdown(tripDate);
    /* Gets data related to the provided city*/
    getCityInfo(baseURL, city, code, userName)
      .then(function(data) {

        let cityCodes = [],
          cityNames = [];
        let duplicate = false;
        let cityPosition = 0;
        // Look through city names from API response, and pull each unique city name.
        for (let count = 0; count < data.postalCodes.length - 1; count++) {
          if (data.postalCodes[count].adminName1 === data.postalCodes[count + 1].adminName1) {
            duplicate = true;
          }
          if (!duplicate) {
            cityCodes[cityPosition] = data.postalCodes[count].postalCode;
            cityNames[cityPosition] = data.postalCodes[count].adminName1;
            cityPosition++;
          }
          duplicate = false;
        }
        // Create multilpe elements
        for (let count = 0; count < cityPosition; count++) {
          let newLine = document.createElement("option");
          newLine.innerText = cityNames[count];
          newLine.value = cityCodes[count];
          document.getElementById('js-country-cities').appendChild(newLine);
        }
      })
    countryAreaContainer.classList.remove('hidden');

  } else {
    console.log("Hello")
    // User has selected a country, and selecting a city/ area within that country
    let areaSelected = document.getElementById('js-country-cities');
    let areaCode = areaSelected.options[areaSelected.selectedIndex].value;
    let areaName = areaSelected.options[areaSelected.selectedIndex].text;
    document.getElementById('forecast-city-name').innerHTML = areaName
    document.getElementById('final-city-name').innerHTML = areaName
    /*
      imgSection.firstElementChild.remove()
      getTripInfo()
    */
    let areaWithinCountryCode = '&postalcode=' + areaCode;
    let cityNameSelected = areaName;
    // Link = baseURL + areaName + areaWithinCountryCode + userName
    getCityInfo(baseURL, areaName, areaWithinCountryCode, userName)
      .then(function(data) {
        // Get Lat and Long
        latitude = data.postalCodes[0].lat;
        longitude = '&lon=' + data.postalCodes[0].lng;


        // MAKEING REQUEST RO WEATHER API
        getCityWeather(weatherbitURL, latitude, longitude, weatherbitKEY)
          .then(function(weatherData) {
            for (let count = 0; count <= 15; count++) {
              document.getElementById('valid-date-' + count).innerHTML = weatherData.data[count].valid_date;
              document.getElementById('weather-description-' + count).innerHTML = weatherData.data[count].weather.description;
              document.getElementById('max-temp-' + count).innerHTML = weatherData.data[count].max_temp;
              document.getElementById('temp-' + count).innerHTML = weatherData.data[count].temp;
              document.getElementById('min-temp-' + count).innerHTML = weatherData.data[count].min_temp;
            }
            // Show the weather section AFTER it has been populated with data
            document.getElementById('final-results-container').classList.remove('display-none');
            document.getElementById('final-results-container').classList.add('display-block');

            let cityPhoto = '&q=city+of+' + areaName.replace(/ /g, "+") + '&image_type=photo';

            // MAKEING REQUEST RO PIXABAY API
            getPixabayPhoto(pixabayURL, pixabayKEY, cityPhoto, weatherbitKEY)
              .then(function(pixabayData) {
                let cityLink = pixabayData.hits[0].webformatURL;
                document.getElementById('city-photo').style.backgroundImage = "url('" + cityLink + "')";

              })
          })

      });
  }
}

// ################################ FUNCTIONS BELOW #####################

const getCityInfo = async (baseURL, city, code, userName) => {
  const res = await fetch(baseURL + city + code + userName)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log('error', error)
  }
}

const getCityWeather = async (weatherbitURL, latitude, longitude, weatherbitKEY) => {
  const res = await fetch(weatherbitURL + latitude + longitude + weatherbitKEY)
  try {
    const weatherData = await res.json();
    console.log(weatherData)
    return weatherData;
  } catch (error) {
    console.log('error', error)
  }
}

const getPixabayPhoto = async (pixabayURL, pixabayKEY, cityPhoto) => {
  const res = await fetch(pixabayURL + pixabayKEY + cityPhoto)
  try {
    const pixabayData = await res.json();
    console.log(pixabayData)
    return pixabayData;
  } catch (error) {
    console.log('error', error)
  }
}

/*
const getCityWeather = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
*/



export {
  application
};
