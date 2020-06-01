const express = require('express');
const router = express.Router();


//import authentication controller module
const viewsController = require('../controllers/viewsController');


router.get('/home', viewsController.getOtherLayoutsInHomePage, viewsController.homePage);

router.get('/product-page/:slug', viewsController.getProduct);



module.exports = router;
