const express = require('express');
const router = express.Router();

//import review controller
const reviewsController = require('../controllers/reviewController');



//import authentication controller module
const authController = require('./../controllers/authController');





//To protect all the review route
router.use(authController.protectRouteToEnableOnlyLoggedInUser);



router.post('/api/v1/review', authController.restrictAccessTo('user'), reviewsController.createReview);




module.exports = router;