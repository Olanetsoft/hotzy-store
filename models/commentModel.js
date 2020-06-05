const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


//creating comment model
const commentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'A full name is required 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [20, 'A full name must have less or equal 20 characters🤦‍♀️'],
        minlength: [5, 'A full name must have more or equal 5 characters🤦‍♀️']
    },
    slug: String,
    email: {
        type: String,
        required: [true, 'Please provide an email 😥'],
        unique: true,
        lowercase: true,
        //using the validator installed
        validate: [validator.isEmail, 'Please provide a valid email 🙄']
    },
    phone: {
        type: Number,
        maxlength: [15, 'A phone number must have less or equal 15 characters🤦‍♀️'],
        minlength: [11, 'A phone number must have more or equal 11 characters🤦‍♀️']
    },
    message: {
        type: String,
        required: [true, 'A message must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [1000, 'A comment message must have less or equal 1000 characters🤦‍♀️'],
        minlength: [20, 'A comment message must have more or equal 20 characters🤦‍♀️']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a Product.']

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user 😦 ']
    }

}, {
    timestamps: true
});





//DOCUMENT MIDDLEWARE: runs before .save() and .create()
commentSchema.pre('save', function (next) {
    this.slug = slugify(this.fullName, { lower: true });
    next();
});


//instance methods
//Adding this will make all the query automatically populate all the user details
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        //this was added to show only this field upon request
        select: 'name photo'
    });
    // this.populate({
    //     path: 'tour',
    //     //this was added not to show this field upon request
    //     select: 'name'
    // });
    next();
});





//define the Product Model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;