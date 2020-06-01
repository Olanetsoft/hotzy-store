const express = require('express');
const router = express.Router();


//import user controller
//const userController = require('../controllers/usersControllers');

//import auth controller
const authController = require('../controllers/authController');



router.post('/api/v1/users/login', authController.login);

router.get('/api/v1/users/logout', authController.logout);

router.post('/api/v1/users/signup', authController.signup);




//Restricting all the routes below to only admin 
router.use(authController.restrictTo('admin'));

router.get('/api/v1/users', userController.getAllUsers);

router.get('/api/v1/user/:id', userController.getUser);

router.patch('/api/v1/users/:id', userController.updateUser);

router.delete('/api/v1/users/:id', userController.deleteUser);




module.exports = router;