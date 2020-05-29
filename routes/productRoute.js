const express = require('express');
const router = express.Router();


//import tour controller
const productController = require('./../controllers/productController');


//post a product to route
router.post('/api/v1/product', productController.createProduct);

router.get('/api/v1/product/:productId', productController.getProduct);





module.exports = router;