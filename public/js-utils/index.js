//import polyfill
import '@babel/polyfill';


//import login.js code
import {
    login,
    login2,
    logout,
    signup,
    postComment,
    postReview,
    postForgetPassword,
    patchResetPassword
} from './utils';



//DOM ELEMENT
const loginForm = document.querySelector('.contact_form.login');
const loginForm2 = document.querySelector('.contact_form.returning_user_login');
const logoutBtn = document.querySelector('.nav-link.logout');
const signupForm = document.querySelector('.contact_form.signup');
const contactPageForm = document.querySelector('.contact_form.contact-us');
const reviewPageForm = document.querySelector('.contact_form.review');
const forgotPasswordPageForm = document.querySelector('.tracking_form');
const resetPasswordPageForm = document.querySelector('.tracking_form.resetPassword');




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


//Login from checkout page
if (loginForm2) {
    loginForm2.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login2(email, password);
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
        const slug = document.getElementById('slug').value;
        //console.log(productId);
        postReview(review, rating, userId, productId, slug);
        //reviewPageForm.reset()
    });
};


//forgot password
if (forgotPasswordPageForm) {
    forgotPasswordPageForm.addEventListener('submit', e => {
        e.preventDefault();

        //VALUES
        //get the details
        const email = document.getElementById('email').value;
        postForgetPassword(email);
        //reviewPageForm.reset()
    });
};


//reset password
if (resetPasswordPageForm) {
    resetPasswordPageForm.addEventListener('submit', e => {
        e.preventDefault();

        //VALUES
        //get the details
        const password = document.getElementById('password').value;
        console.log(password)
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        console.log(passwordConfirm)
        // const token = document.getElementById('token').value;
        // console.log(token)
        patchResetPassword(password, passwordConfirm);
        //reviewPageForm.reset()
    });
};
