/* Check if the URL the user has entered is a VALID url.
- Makes sure user is not typing in text, fake urls, numbers etc..
*/
const validUrl = require('valid-url');

function checkValidUrl(url) {
    return validUrl.isUri(url); 
}

export{checkValidUrl}
