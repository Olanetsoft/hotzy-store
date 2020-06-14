const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_KEY);


var Cart = require('../models/cartModel');
var Product = require('../models/productModel');
var Order = require('../models/orderModel');



//import authentication controller module
const authController = require('../controllers/authController');

//import authentication controller module
const cartController = require('../controllers/cartController');



router.get('/add-to-cart/:id/:slug', cartController.addToCart);

router.get('/shopping-cart', cartController.getShoppingCart);

router.post('/create-order', authController.isLoggedIn, cartController.order);


module.exports = router;
