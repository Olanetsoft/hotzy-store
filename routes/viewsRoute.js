const express = require('express');
const router = express.Router();


//import authentication controller module
const viewsController = require('../controllers/viewsController');


router.get('/home', viewsController.getBanners, viewsController.homePage, );

module.exports = router;
