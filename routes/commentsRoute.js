const express = require('express');
const router = express.Router();


//import tour controller
const commentController = require('./../controllers/commentController');


//product route
router.post('/api/v1/comment-message', commentController.postComment);

// router.get('/api/v1/contact-message/:name', contactController.getContact);

// router.get('/api/v1/contact-messages', contactController.getAllContacts);



module.exports = router;