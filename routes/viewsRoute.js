const express = require('express');
const router = express.Router();

var Cart = require('../models/cartModel');
var Product = require('../models/productModel');

//import authentication controller module
const viewsController = require('../controllers/viewsController');

//import authentication controller module
const authController = require('../controllers/authController');


router.get('/home', authController.isLoggedIn, viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', authController.isLoggedIn, viewsController.getProduct);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/signup', viewsController.signup);

router.get('/contact', viewsController.getContactPage);

router.get('/cart', authController.isLoggedIn, viewsController.getCartPage);

router.get('/checkout', authController.isLoggedIn, viewsController.getCheckout);


router.get('/add-to-cart/:id/:slug', function (req, res, next) {
    var productId = req.params.id;
    var slug = req.params.slug
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect(`/product-page/${slug}`);
    });
});



//router.post('/api/v1/contact-message', viewsController.postContact);

module.exports = router;
