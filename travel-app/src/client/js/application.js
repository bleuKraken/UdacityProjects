function application(event) {
  event.preventDefault()
  console.log("Event is " + event);
  // Get Data Selected
  let countryAreaContainer = document.getElementById('container-area');
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
        populateDropdown(data)
      });
    countryAreaContainer.classList.remove('hidden');
  } else {
    // User has selected a country, and selecting a city/ area within that country
    let areaSelected = document.getElementById('js-country-cities');
    let areaCode = areaSelected.options[areaSelected.selectedIndex].value;
    let areaName = areaSelected.options[areaSelected.selectedIndex].text;
    document.getElementById('forecast-city-name').innerHTML = areaName
    document.getElementById('final-city-name').innerHTML = areaName
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
        cityLocation(data)
      });
  }
  StartCountdownTimer();
}

// Populate the dropdown based on what country the user selects
function cityLocation(data = {}) {
  // Fill each weather item with information
  for (let count = 0; count < 16; count++) {
    document.getElementById('valid-date-' + count).innerHTML = data.weatherdate[count];
    document.getElementById('weather-description-' + count).innerHTML = data.description[count];
    document.getElementById('max-temp-' + count).innerHTML = data.maxtemp[count];
    document.getElementById('temp-' + count).innerHTML = data.temperature[count];
    document.getElementById('min-temp-' + count).innerHTML = data.mintemp[count];
  }

  console.log('photo: ' + data.photo)
  //document.getElementById('city-photo').src = ;
  document.getElementById('city-photo').style.backgroundImage = "url('" + data.photo + "')";



  // Show the weather section AFTER it has been populated with data
  document.getElementById('final-results-container').classList.remove('display-none');
  document.getElementById('final-results-container').classList.add('display-block');
}


// Populate the dropdown based on what country the user selects
function populateDropdown(data = {}) {
  let cityCodes = data.citycodes;
  let cities = data.citynames;
  let cityPosition = data.cityposition;
  // Create multilpe elements
  for (let count = 0; count < cityPosition; count++) {
    let newLine = document.createElement("option");
    newLine.innerText = cities[count];
    newLine.value = cityCodes[count];
    document.getElementById('js-country-cities').appendChild(newLine);
  }
}


// Countdown timer and time
function StartCountdownTimer() {
  let departureDate = document.getElementById('departure-date').value;
  // Grab Year, Month, and Day
  let departureYear = departureDate.slice(0, departureDate.indexOf("-"))
  let departureMonth = departureDate.slice(departureDate.indexOf("-") + 1, departureDate.indexOf("-") + 3)
  let departureDay = departureDate.slice(8)
  // Removes the 0 from day
  if (departureDay.charAt(0) === "0") departureDay = departureDay.slice(1)

  // Day to count down to
  var countDownDate = new Date(departureMonth + " " + departureDay + ", " + departureYear + " 00:00:01").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    var now = new Date().getTime();
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
      document.getElementById("countdown").innerHTML = "TIME TO TRAVEL";
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
  application
}
