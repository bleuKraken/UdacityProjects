
import { handleSubmit } from '../js/formHandler';
import { checkForName} from '../js/nameChecker';

//const urlChecker = require("../js/CheckValidUrl");


import '../styles/resets.scss';
import '../styles/base.scss';
import '../styles/footer.scss';
import '../styles/form.scss';
import '../styles/header.scss';


document.getElementById('btn-enter').addEventListener('click', () => {
    handleSubmit(event);
});


export{checkForName, handleSubmit}
