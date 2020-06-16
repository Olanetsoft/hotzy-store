const express = require('express');
const router = express.Router();




//import authentication controller module
const authController = require('../controllers/authController');

//import authentication controller module
const cartController = require('../controllers/cartController');



router.get('/add-to-cart/:id/:slug', cartController.addToCart);

router.get('/delete-from-cart', cartController.deleteFromCart);

router.get('/shopping-cart', cartController.getShoppingCart);

router.post('/create-order', authController.isLoggedIn, cartController.order);


module.exports = router;
