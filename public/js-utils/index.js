//import polyfill
import '@babel/polyfill';


//import login.js code
import { login, logout, signup, postComment, postReview } from './utils';



//DOM ELEMENT
const loginForm = document.querySelector('.contact_form.login');
const logoutBtn = document.querySelector('.nav-link.logout');
const signupForm = document.querySelector('.contact_form.signup');
const contactPageForm = document.querySelector('.contact_form.contact-us');
const reviewPageForm = document.querySelector('.contact_form.review');




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
        const confirmPassword = document.getElementById('passwordConfirm').value;
        signup(name, email, password, confirmPassword);

    });
};


//contact
if (contactPageForm) {
    contactPageForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the details
        const name = document.getElementById('name').value;
        //console.log(name);
        const email = document.getElementById('email').value;
        //console.log(email);
        const message = document.getElementById('message').value;
        //console.log(message);
        const subject = document.getElementById('subject').value;
        //console.log(subject);
        postComment(name, email, message, subject);

    });
};


//review
if (reviewPageForm) {
    reviewPageForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the details
        const review = document.getElementById('reviewDetails').value;
        //console.log(review);
        const rating = document.getElementById('rating').value;
        //console.log(rating);
        const userId = document.getElementById('userId').value;
        //console.log(userId);
        const productId = document.getElementById('productId').value;
        //console.log(productId);
        postReview(review, rating, userId, productId);

    });
};
