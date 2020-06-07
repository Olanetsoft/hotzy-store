//import polyfill
import '@babel/polyfill';


//import login.js code
import { login } from './login-logout';



//DOM ELEMENT
const loginForm = document.querySelector('.contact_form');


//Login
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
};