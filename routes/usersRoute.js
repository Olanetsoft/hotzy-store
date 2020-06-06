const express = require('express');
const router = express.Router();


//import user controller
const userController = require('../controllers/usersController');

//import auth controller
const authController = require('../controllers/authController');



router.post('/api/v1/users/login', authController.login);

router.get('/api/v1/users/logout', authController.logout);

router.post('/api/v1/users/signup', authController.signup);

router.post('/api/v1/users/forgotPassword', authController.forgotPassword);

router.patch('/api/v1/users/resetPassword/:token', authController.resetPassword);




//To protect all the route after the ones listed above
//router.use(authController.protectRouteToEnableOnlyLoggedInUser);

router.get('/api/v1/users/me', userController.getMe, authController.protectRouteToEnableOnlyLoggedInUser, userController.getUser);

router.patch('/api/v1/users/updateMyPassword', authController.protectRouteToEnableOnlyLoggedInUser, authController.updateMyPassword);

router.patch('/api/v1/users/updateMe', authController.protectRouteToEnableOnlyLoggedInUser, userController.updateMe);

router.delete('/api/v1/users/deleteMe', authController.protectRouteToEnableOnlyLoggedInUser, userController.deleteMe);





//Restricting all the routes below to only admin 
//router.use(authController.restrictAccessTo('admin'));

router.get('/api/v1/users', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('admin'), userController.getAllUsers);

router.get('/api/v1/user/:id', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('admin'), userController.getUser);

router.patch('/api/v1/user/:id', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('admin'), userController.updateUser);

router.delete('/api/v1/user/:id', authController.protectRouteToEnableOnlyLoggedInUser, authController.restrictAccessTo('admin'), userController.deleteUser);




module.exports = router;