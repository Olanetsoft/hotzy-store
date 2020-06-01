const mongoose = require('mongoose');
const validator = require('validator');

//importing cypto from the node module
const crypto = require('crypto')

//importing bcrypt
const bcrypt = require('bcrypt');


//name,email,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({

    name: {
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


//SIGNUP
//encrypting password
//using document middleware
userSchema.pre('save', async function (next) {

    //only run the If statement if password was modified
    if (!this.isModified('password')) {
        return next();
    };

    //taking the current password in this document
    this.password = await bcrypt.hash(this.password, 12);

    //deleting the passwordConfirm field because we don't want it to persist in the db
    this.passwordConfirm = undefined;

    next();
});




//LOGIN
//To update the changePasswordAt before save a document
userSchema.pre('save', function (next) {
    //password not modified or is new
    if (!this.isModified('password') || this.isNew) {
        return next()
    };

    //this put the passwordChangedAt 1sec in the past
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

//LOGIN
//creating an instance method that is going to be available on all document on a certain collection
userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};




//USER
//Not to show an inactive user when requesting all users Routes
userSchema.pre(/^find/, function (next) {
    //this points to the current query
    this.find({ active: { $ne: false } })
    next();
});



//PROTECT
//check if user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        //console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimeStamp; //100 < 200
    };

    //False means NOT changed
    return false;
};




//USER PASSWORD RESET
//To create password reset token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    //using the crypto to create hash value with the resetToken into passwordResetToken

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest('hex')

    console.log({ resetToken }, this.passwordResetToken);

    //setting the password expire time 
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};




















//define the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;