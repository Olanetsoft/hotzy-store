//requiring crypto
const crypto = require('crypto');

//get the promisify methods
const { promisify } = require('util');


//using the json web token
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');


//importing error class
const AppError = require('./../utilities/appError');


//signup user
exports.signup = async (req, res, next) => {
    try {
        //create new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
        });


        //using the jwt to create a signature 
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        //console.log(token)


        //set cookie options
        const cookieOptions = {
            //convert JWT_COOKIE_EXPIRES_IN to millisecond
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        };


        //sending cookie to the client
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions);


        //removing the password from the output in response after sign up
        newUser.password = undefined;


        res.status(201).json({
            status: 'Success',
            token,
            data: {
                newUser
            }
        });

    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'failed',
            message: err
        })
    };

};


//handler for logging in user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //1.) Check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide email and password! 🙄', 400));
        };

        //2.) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        //to compare the entered password and the userPassword
        //const correct = await user.correctPassword(password, user.password);

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password! 🙄', 401));
        }

        //3.)If everything is fine then send back token to client
        //using the jwt to create a signature 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        //set cookie options
        const cookieOptions = {
            //convert JWT_COOKIE_EXPIRES_IN to millisecond
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        //sending cookie to the client
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions);


        res.status(200).json({
            status: 'success',
            token
        });

    } catch{
        next(new AppError('Unable to login 🙄', 400))
    }

};

