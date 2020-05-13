function countryFormHandler(event) {
  event.preventDefault()

  let countryAreaContainer = document.getElementById('container-area');
  //Get country selected
  let countrySelected = document.getElementById('dropdown-country');
  let countryCode = countrySelected.options[countrySelected.selectedIndex].value;
  let countryName = countrySelected.options[countrySelected.selectedIndex].text;


  // If area within a country is not show, user must select a country
  if (countryAreaContainer.classList.contains('hidden')) {
    console.log("::: Form Submitted :::")

    //fetch('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + countryCode + '&cmaxRows=10&username=bleu23')
    fetch('http://api.geonames.org/postalCodeSearchJSON?placename=' + countryName + '&cmaxRows=1000&username=bleu23')
      .then(res => res.json())
      .then(function(res) {
        ClearOptions();
        // For every dropdown option, display cities and names that belog to that country
        for (let count = 0; count < res.postalCodes.length - 1; count++) {
          // Removes duplicates from cities and areas
          if (res.postalCodes[count].adminName1 == res.postalCodes[count + 1].adminName1) {
            count++
          } else {
            // If the next state/city is not a duplicate, create it as an option for the dropdown
            let newLine = document.createElement("option");
            newLine.innerText = res.postalCodes[count].adminName1;
            document.getElementById('js-country-cities').appendChild(newLine);
          }
        }
      })
    countryAreaContainer.classList.remove('hidden');
  } else {
    // Country selected, display option to select area within that country
    alert("Shiit, whats next b?")
    let areaSelected = document.getElementById('js-country-cities');
    let areaCode = areaSelected.options[areaSelected.selectedIndex].value;
    let areaName = areaSelected.options[areaSelected.selectedIndex].text;

    console.log('areaCode: ' + areaCode)
    console.log('areaName: ' + areaName)
    //TODO: add country request for lat and long. 2 approuches here.
    // 1 -- do somethnig with the zip value of country
    // 2 =- check doc of api if there is something i can do with areaName above
    /*
        console.log("::: Form 2 Submitted :::")
        //fetch('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + countryCode + '&cmaxRows=10&username=bleu23')
        fetch('http://api.geonames.org/postalCodeSearchJSON?placename=' + countryName + '&cmaxRows=1000&username=bleu23')
          .then(res => res.json())
          .then(function(res) {
            ClearOptions();
            // For every dropdown option, display cities and names that belog to that country
            for (let count = 0; count < res.postalCodes.length - 1; count++) {
              // Removes duplicates from cities and areas
              if (res.postalCodes[count].adminName1 == res.postalCodes[count + 1].adminName1) {
                count++;
              } else {
                // If the next state/city is not a duplicate, create it as an option for the dropdown
                let newLine = document.createElement("option");
                newLine.innerText = res.postalCodes[count].adminName1;
                document.getElementById('js-country-cities').appendChild(newLine);
              }
            }
          })
          */
  }


  StartCountdownTimer();
}



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
