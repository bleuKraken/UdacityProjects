function countryFormHandler(event) {
  event.preventDefault()

  let countryAreaContainer = document.getElementById('container-area');
  // For API
  let countrySelected = document.getElementById('dropdown-country');
  let countryCode = countrySelected.options[countrySelected.selectedIndex].value;
  let countryName = countrySelected.options[countrySelected.selectedIndex].text;
  document.getElementById('final-country-name').innerHTML = countryName;

  // If area within a country is not show, user must select a country
  if (countryAreaContainer.classList.contains('hidden')) {
    console.log("::: Form Submitted :::")
    // async function to post form data to backend
    async function postFormData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    }
    // Sending to Server
    postFormData('http://localhost:3000/travel', {
        country: countryCode,
        countryname: countryName
      })
      .then((data) => {
        populateDropdown(data);
      });


    countryAreaContainer.classList.remove('hidden');
  } else {
    // Country selected, display option to select area within that country
    let areaSelected = document.getElementById('js-country-cities');
    let areaCode = areaSelected.options[areaSelected.selectedIndex].value;
    let areaName = areaSelected.options[areaSelected.selectedIndex].text;
    // async function to post form data to backend
    async function postFormData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    }
    // Sending to Server
    postFormData('http://localhost:3000/travel-location', {
        city: areaName,
        citycode: areaCode
      })
      .then((data) => {
        cityLocation(data);
      });
  }
  StartCountdownTimer();
}

// Populate the dropdown based on what country the user selects
function cityLocation(data = {}) {
// Fill each weather item with information
document.getElementById('city-name-weather').innerHTML = data.name;
document.getElementById('final-city-name').innerHTML = data.name;

for (let count = 0; count < 16; count++) {
  document.getElementById('valid-date-' + count).innerHTML = data.weatherdate[count];
  document.getElementById('weather-description-' + count).innerHTML = data.description[count];
  document.getElementById('max-temp-' + count).innerHTML = data.maxtemp[count];
  document.getElementById('temp-' + count).innerHTML = data.temperature[count];
  document.getElementById('min-temp-' + count).innerHTML = data.mintemp[count];
}

console.log('photo: ' + data.photo)
document.getElementById('city-photo').src = data.photo;

console.log(toString(data.photo))
  // Show the weather section AFTER it has been populated with data
  document.getElementById('final-results-container').classList.remove('display-none');
  document.getElementById('final-results-container').classList.add('display-block');
}


// Populate the dropdown based on what country the user selects
function populateDropdown(data = {}) {
  document.getElementById('result-country-name').innerHTML = data.country;
  //  Example - a,Liguria,Andorra la Vella,Aragon,Rajasthan,Himachal Pradesh,Bihar,Canillo,Liguria,Navarra,Encamp,Escaldes-Engordany,Navarra,Occitanie,La Massana,Ordino
  let cityCodes = data.citycodes;
  let cities = data.citynames;
  let firstComma = 2;
  let firstCityCodeComma = 2;
  let nextComma = cities.indexOf(",", 3);
  let nextCodeComma = cityCodes.indexOf(",", 3);
  let commaCount = (cities.split(',').length - 1);
  // Populate dropdown
  for (let count = 0; count < commaCount; count++) {
    // Pull out every name between commas
    let city = cities.slice(firstComma, nextComma);
    let code = cityCodes.slice(firstCityCodeComma, nextCodeComma);
    let newLine = document.createElement("option");
    newLine.innerText = city;
    newLine.value = code;
    document.getElementById('js-country-cities').appendChild(newLine);
    firstComma = nextComma + 1;
    firstCityCodeComma = nextCodeComma + 1;
    nextComma = cities.indexOf(",", firstComma + 2);
    nextCodeComma = cityCodes.indexOf(",", firstCityCodeComma + 2);
  }
}




// Delete this, i can do better ! 
// Countdown timer and time
function StartCountdownTimer() {
  //TODO: Add date below
  var countDownDate = new Date("Jan 5, 2021 01:01:01").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // Date is reached!!
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "TRIP";
    }
  }, 1000);
}

// Clears the dropdown of cities and areas when submit is pressed again
function ClearOptions() {
  const optionNode = document.getElementById("js-country-cities");
  while (optionNode.firstChild) {
    optionNode.removeChild(optionNode.lastChild);
  }
}

export {
  countryFormHandler
}
