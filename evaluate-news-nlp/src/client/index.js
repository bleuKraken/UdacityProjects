import { formHandler } from '../js/formHandler';
import { checkValidUrl } from '../js/checkValidUrl';

import '../styles/resets.scss';
import '../styles/base.scss';
import '../styles/footer.scss';
import '../styles/form.scss';
import '../styles/header.scss';

//Event listener on Submit button
document.getElementById('btn-enter').addEventListener('click', () => {
    formHandler(event);
});


export{formHandler, checkValidUrl}
