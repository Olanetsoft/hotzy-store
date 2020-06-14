const express = require('express');
const router = express.Router();


//import authentication controller module
const viewsController = require('../controllers/viewsController');

//import authentication controller module
const authController = require('../controllers/authController');


router.get('/', authController.isLoggedIn, viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', authController.isLoggedIn, viewsController.getProduct);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/signup', viewsController.signup);

router.get('/contact', viewsController.getContactPage);

router.get('/order', authController.isLoggedIn,viewsController.getOrderPage);

//router.get('/cart', authController.isLoggedIn, viewsController.getCartPage);

router.get('/checkout', authController.isLoggedIn, viewsController.getCheckout);




//router.post('/api/v1/contact-message', viewsController.postContact);

module.exports = router;
