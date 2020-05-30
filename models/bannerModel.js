const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//creating banner model
const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A banner must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [30, 'A banner name must have less or equal 30 characters🤦‍♀️'],
        minlength: [10, 'A banner name must have more or equal 10 characters🤦‍♀️']
    },
    description: {
        type: String,
        required: [true, 'A banner must have a description 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [350, 'A product name must have less or equal 150 characters🤦‍♀️'],
        minlength: [30, 'A product name must have more or equal 30 characters🤦‍♀️']
    },
    images: [String]
},
    //to make the virtual show up when a request is made you need to enable it here in the schema
    {
        timestamps: true
    }
);


//define the Banner Model
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
