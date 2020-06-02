import { application } from './js/application.js'

import './styles/style.scss'


document.getElementById('submit-country-button').addEventListener('click', () => {
  application(event);
});


document.getElementById('submit-area-button').addEventListener('click', () => {
  application(event);
});


alert("Hello from src client undex.js");
export { application}
