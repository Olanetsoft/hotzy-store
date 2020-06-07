//import polyfill
import '@babel/polyfill';


//import login.js code
import { login, logout, signup } from './login-logout';



//DOM ELEMENT
const loginForm = document.querySelector('.contact_form');
const logoutBtn = document.querySelector('.nav-link.logout');
const signupForm = document.querySelector('.contact_form.signup');




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


//Signup
if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('password').value;
        signup(name, email, password, confirmPassword);

    });
};
