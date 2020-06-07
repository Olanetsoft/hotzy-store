const express = require('express');
const router = express.Router();


//import authentication controller module
const viewsController = require('../controllers/viewsController');

//import authentication controller module
const authController = require('../controllers/authController');


router.get('/home',authController.isLoggedIn, viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', viewsController.getProduct);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/signup', viewsController.signup);

module.exports = router;
