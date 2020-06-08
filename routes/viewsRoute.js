const express = require('express');
const router = express.Router();


//import authentication controller module
const viewsController = require('../controllers/viewsController');

//import authentication controller module
const authController = require('../controllers/authController');


router.get('/home', authController.isLoggedIn, viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', authController.isLoggedIn, viewsController.getProduct);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/signup', viewsController.signup);

router.get('/contact', viewsController.getContactPage);

//router.post('/api/v1/contact-message', viewsController.postContact);

module.exports = router;
