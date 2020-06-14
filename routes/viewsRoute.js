const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_KEY);

var Cart = require('../models/cartModel');
var Product = require('../models/productModel');
var Order = require('../models/orderModel');

//import authentication controller module
const viewsController = require('../controllers/viewsController');

//import authentication controller module
const authController = require('../controllers/authController');


router.get('/home', authController.isLoggedIn, viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', authController.isLoggedIn, viewsController.getProduct);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/signup', viewsController.signup);

router.get('/contact', viewsController.getContactPage);

//router.get('/cart', authController.isLoggedIn, viewsController.getCartPage);

router.get('/checkout', authController.isLoggedIn, viewsController.getCheckout);


router.get('/add-to-cart/:id/:slug', function (req, res, next) {

    var productId = req.params.id;
    var slug = req.params.slug
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        //console.log(req.session.cart)
        res.redirect(`/product-page/${slug}`);
    });
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('cart', { products: null });
    }
    var cart = new Cart(req.session.cart);

    res.render('cart', {

        products: cart.generateArray(),
        totalPrice: cart.totalPrice

    });

});


router.post('/create-order', authController.isLoggedIn, function (req, res, next) {

    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = req.body.stripeToken; // Using Express
    let totalSum = 0;

    var cart = new Cart(req.session.cart);

    //var products = cart.generateArray();

    const products = cart.generateArray().map(i => {
        return { quantity: i.qty, product: { ...i.productId } };
    });
    var totalPrice = cart.totalPrice;

    if (!req.user) return res.render('login', { products: null });

    const order = new Order({
        user: {
            email: req.user.email,
            userId: req.user
        },
        products: products
    });
    order.save();
    const charge = stripe.charges.create({
        amount: totalPrice * 100,
        currency: 'usd',
        description: 'Product Order',
        source: token,
        //metadata: { order_id: result._id.toString() }
    });
    res.redirect('/home');

});
//router.post('/api/v1/contact-message', viewsController.postContact);

module.exports = router;
