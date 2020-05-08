function zipFormHandler(event) {
    event.preventDefault()

    // check what text was put into the form field
    let zipcode = document.getElementById('zipcode').value;

    console.log("zipcode:" + zipcode);
    //checkForName(formText)

    /*
      DOES NOT RELOAOD ON SECOND ZIP
    */


    console.log("::: Form Submitted :::")
    /*
      postalcode_startsWith = 91790
      country = US
      maxRows = 10
    */
    fetch('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + zipcode + '&country=US&maxRows=10&username=bleu23')
    .then(res => res.json())
    .then(function(res) {
      console.log(res.postalCodes[0].placeName)
        document.getElementById('results').innerHTML = res.postalCodes[0].placeName

    })
}

export { zipFormHandler }
