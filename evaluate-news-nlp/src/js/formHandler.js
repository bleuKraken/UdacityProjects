const checkValidUrl = require("./checkValidUrl");

/* Check if URL entered by user is valif, if it is - attempt to contact
  Aylien API anf retrieeve response. Then post data on HTML
*/
function formHandler(event) {
  event.preventDefault();

  const baseUrl = 'http://localhost:8081/sentiment';
  const url = document.getElementById('url-entered').value;

  // If user has entered a valid URL from the internet with an article
  if (checkValidUrl(url)) {
    fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          url: url
        })
      })
      .then(console.log("Attempting to fetch data and populate"))
      .then(res => res.json())
      .then(function(res) {
        // Populate ID's in html with data from Aylien API :)
        document.getElementById('polarity').innerHTML = res.polarity;
        document.getElementById('subjectivity').innerHTML = res.subjectivity;
        document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence;
        document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence;
      })
  }
  // Nothing Entered
  else if(url === "") {
    alert("Please enter a URL");
  }
  else {
    alert("URL not found")
  }
}

//required
export { formHandler }
