//importing tour model
const User = require('../models/userModel');

//import AppError
const AppError = require('../utilities/appError');





//LOGGED-IN USER
//create a function to filter fields and return new object
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    //looping through all the fields to check if its one of the allowed fields
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};



//LOGGED-IN USER
//updating user Details
exports.updateMe = async (req, res, next) => {
    try {
        //1) create error if user POST password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is not for password update. please use /updateMyPassword', 400))
        }


        //2) Filtered out unwanted fields names that are not allowed to be updated
        //create a filtered body by using the function filterObj
        const filteredBody = filterObj(req.body, 'name', 'email');

        //check if file upload is included for photo
        if (req.file) {
            filteredBody.photo = req.file.filename
        }


        //3) Update user DOCUMENT
        //now get the update users
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });


        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        next(new AppError('Fail to update user data', 404));
    };
};


//LOGGED-IN USER
//implementing get me endpoint to store the user.is for the next middleware
exports.getMe = async (req, res, next) => {
    req.params.id = req.user.id;
    next();
};



//LOGGED-IN USER
//create a delete me
exports.deleteMe = async (req, res, next) => {
    try {
        //find and update the active status to false
        await User.findByIdAndUpdate(req.user.id, { active: false });

        //SEND RESPONSE IN JSON
        res.status(204).json({
            status: 'success',
            data: null

        });
    } catch (err) {
        return next(new AppError('Unable to delete User', 400))
    }
};













//ADMIN
//get a users
exports.getUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)

        //Or Tour.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                singleUser
            }
        });

    } catch (err) {

        //return error to check if user exist
        next(new AppError(`No user found with ID: ${req.params.id}`, 404));
        // res.status(404).json({
        //     status: "failed",
        //     message: err
        // });
    }
};


//ADMIN
//Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        next(new AppError('Fetching all users failed 🙄', 400));
    }

};


//ADMIN
//Deleting a user
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        //return error to check if document was deleted
        next(new AppError(`Unable to delete Document with ID: ${req.params.id}`, 404));
    };
};



//ADMIN
//Update a user
exports.updateUser = async (req, res, next) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: updatedUser
            }
        });
    } catch (err) {
        //return error to check if user is updated
        next(new AppError('Unable to Update User', 404));
    };
};
