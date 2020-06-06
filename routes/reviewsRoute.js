const express = require('express');
const router = express.Router();

//import review controller
const reviewsController = require('../controllers/reviewController');



//import authentication controller module
const authController = require('../controllers/authController');






router.get('/api/v1/reviews', reviewsController.getAllReviews);

router.get('/api/v1/review/:id', reviewsController.getSingleReview);


//To protect all the review route
//router.use(authController.protectRouteToEnableOnlyLoggedInUser);


router.post('/api/v1/review', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('user'), reviewsController.createReview);

router.patch('/api/v1/review/:id', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('user', 'admin'), reviewsController.updateReview);

router.delete('/api/v1/review/:id', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('user', 'admin'), reviewsController.deleteReview);




module.exports = router;