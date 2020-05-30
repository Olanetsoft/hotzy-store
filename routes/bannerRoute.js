const express = require('express');
const router = express.Router();


//import authentication controller module
const bannerController = require('../controllers/bannerController');


router.post('/api/v1/banner', bannerController.createBannerProduct);


module.exports = router;
