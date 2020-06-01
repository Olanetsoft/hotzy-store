//importing tour model
const User = require('../models/userModel');

//import AppError
const AppError = require('../utilities/appError');




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
