const express = require('express');
const router = express.Router();


//import tour controller
const commentController = require('./../controllers/commentController');



//import authentication controller module
const authController = require('./../controllers/authController');


//To protect all the comment route
router.use(authController.protectRouteToEnableOnlyLoggedInUser);


//comment route

router.get('/api/v1/comment-messages', commentController.getAllComments);

router.post('/api/v1/comment-message', authController.restrictAccessTo('user'), commentController.postComment);

// router.get('/api/v1/contact-message/:name', contactController.getContact);




module.exports = router;