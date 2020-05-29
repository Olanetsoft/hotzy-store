const express = require('express');
const router = express.Router();


//import tour controller
const productController = require('./../controllers/productController');


//product route
router.post('/api/v1/product', productController.createProduct);

router.get('/api/v1/product/:productId', productController.getProduct);

router.get('/api/v1/products', productController.getProducts);





module.exports = router;