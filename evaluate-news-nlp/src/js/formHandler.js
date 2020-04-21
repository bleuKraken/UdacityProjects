const urlChecker = require("./CheckValidUrl");

/* Check if URL entered by user is valif, if it is - attempt to contant
  Aylien API anf retrieeve response. Then post data on HTML
*/
function handleSubmit(event) {
    event.preventDefault()

    let baseUrl = 'http://localhost:8081/sentiment'
    let url = document.getElementById('url-entered').value
    if (urlChecker(url)) {
        fetch(baseUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ url: url })
        })
        .then(console.log("Attempting to fetch data and populate"))
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity
            document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence
            document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence
        })
    } else {
        alert("URL not found.")
    }
}


export {handleSubmit}
