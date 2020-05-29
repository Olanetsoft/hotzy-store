const express = require('express');
const router = express.Router();


//import tour controller
const productController = require('./../controllers/productController');


//product route
router.post('/api/v1/product', productController.createProduct);

router.get('/api/v1/product/:productId', productController.getProduct);

router.get('/api/v1/products', productController.getProducts);

router.get('/api/v1/products-stats', productController.getProductsStats);

router.get('/api/v1/products/top-5-cheap', productController.aliasTopTours, productController.getProducts);

router.patch('/api/v1/product/:productId', productController.updateOneProduct);

router.delete('/api/v1/product/:productId', productController.deleteOneProduct);




module.exports = router;