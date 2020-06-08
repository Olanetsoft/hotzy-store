const express = require('express');
const router = express.Router();


//import auth controller
const authController = require('../controllers/authController');


//import tour controller
const productController = require('../controllers/productController');





//product route
router.get('/api/v1/products', productController.getProducts);

router.post('/api/v1/product', productController.createProduct);

router.get('/api/v1/product/:productId', productController.getProduct);









//All about user cart
router.post('/api/v1/cart/:productId', authController.protectRouteToEnableOnlyLoggedInUser, productController.postCart);

router.get('/api/v1/cart', authController.protectRouteToEnableOnlyLoggedInUser, productController.getCart);

router.post('/api/v1/cart-delete-item/:productId', authController.protectRouteToEnableOnlyLoggedInUser, productController.postCartDeleteProduct);




//All about user order

router.get('/api/v1/checkout', authController.protectRouteToEnableOnlyLoggedInUser, productController.getCheckout);

router.get('/api/v1/orders', authController.protectRouteToEnableOnlyLoggedInUser, productController.getOrders);






//To protect all the route after the ones listed above
//router.use(authController.protectRouteToEnableOnlyLoggedInUser);

router.get('/api/v1/products-stats', authController.protectRouteToEnableOnlyLoggedInUser, productController.getProductsStats);

router.get('/api/v1/products/top-5-cheap', authController.protectRouteToEnableOnlyLoggedInUser, productController.aliasTopTours, productController.getProducts);

router.patch('/api/v1/product/:productId', authController.protectRouteToEnableOnlyLoggedInUser, productController.updateOneProduct);

router.delete('/api/v1/product/:productId', authController.protectRouteToEnableOnlyLoggedInUser, productController.deleteOneProduct);




module.exports = router;