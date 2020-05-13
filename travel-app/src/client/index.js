import { countryFormHandler } from './js/formHandler'
import { application } from './js/application.js'

import './styles/style.scss'

//import img from './image.png';

/*
Your index.js file inside the client folder should import the main function of your application javascript,
 it should import your scss, and it should export your main function from your application javascript.
 But in order to import, where will you need to export it?
*/

//Event listener on Submit button

document.getElementById('submit-country-button').addEventListener('click', () => {
  countryFormHandler(event);
});

document.getElementById('submit-area-button').addEventListener('click', () => {
  countryFormHandler(event);
});


alert("Hello from src client undex.js");
export { application, countryFormHandler}
