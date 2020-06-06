const express = require('express');
const router = express.Router();


//import tour controller
const contactController = require('../controllers/contactController');


//product route
router.post('/api/v1/contact-message', contactController.postContact);

router.get('/api/v1/contact-message/:name', contactController.getContact);

router.get('/api/v1/contact-messages', contactController.getAllContacts);



module.exports = router;