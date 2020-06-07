//import polyfill
import '@babel/polyfill';


//import login.js code
import { login, logout } from './login-logout';



//DOM ELEMENT
const loginForm = document.querySelector('.contact_form');
const logoutBtn = document.querySelector('.nav-link.logout');




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


//logout
if (logoutBtn) logoutBtn.addEventListener('click', logout);
