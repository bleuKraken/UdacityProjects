import { zipFormHandler } from './js/formHandler'
import { application } from './js/application.js'

import './styles/style.scss'

//import img from './image.png';

/*
Your index.js file inside the client folder should import the main function of your application javascript,
 it should import your scss, and it should export your main function from your application javascript.
 But in order to import, where will you need to export it?
*/

//Event listener on Submit button

document.getElementById('submit-zip-button').addEventListener('click', () => {
  zipFormHandler(event);

});


alert("Hello from src client undex.js");
export { application, zipFormHandler}
