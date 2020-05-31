const mongoose = require('mongoose');
const validator = require('validator');

//importing cypto from the node module
const crypto = require('crypto')

//importing bcrypt
const bcrypt = require('bcrypt');


//name,email,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please tell us your name 🤦‍♀️'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email 😥'],
        unique: true,
        lowercase: true,
        //using the validator installed
        validate: [validator.isEmail, 'Please provide a valid email 🙄']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password 😥'],
        minlength: [8, 'Please provide a password with minimum length of 8 😥'],
        //make the password never show up for any get request
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password 😥'],

        //To confirm and compare the password and the confirmPassword
        //This only work on save!!!
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}
);