/* Check if the URL the user has entered is a VALID url.
- Makes sure user is not typing in text, fake urls, numbers etc..
*/
const validUrl = require('valid-url');

function checkValidUrl(url) {
  console.log("From checkValidUrl, result:" + validUrl.isUri(url));
    return validUrl.isUri(url); 
}

export{checkValidUrl}
