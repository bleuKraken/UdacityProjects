/* Check if the URL the user has entered is a VALID url.
- Makes sure user is not typing in text, fake urls, numbers etc..
*/
const validUrl = require('valid-url');

function isValidURL(URL) {
  console.log("From checkValidUrl, result:" +validUrl.isUri(URL));
    return validUrl.isUri(URL); // TODO: What is url
}

module.exports = isValidURL;
