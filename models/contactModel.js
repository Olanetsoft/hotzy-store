const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


//creating product model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [20, 'A name must have less or equal 20 characters🤦‍♀️'],
        minlength: [5, 'A name must have more or equal 5 characters🤦‍♀️']
    },
    subject: {
        type: String,
        required: [true, 'A subject must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [20, 'A subject must have less or equal 20 characters🤦‍♀️'],
        minlength: [10, 'A subject must have more or equal 5 characters🤦‍♀️']
    },
    message: {
        type: String,
        required: [true, 'A message must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [1000, 'A message must have less or equal 20 characters🤦‍♀️'],
        minlength: [20, 'A message must have more or equal 5 characters🤦‍♀️']
    },

    email: {
        type: String,
        required: [true, 'Please provide an email 😥'],
        unique: true,
        lowercase: true,
        //using the validator installed
        validate: [validator.isEmail, 'Please provide a valid email 🙄']
    },
    slug: String
},
    //to make the virtual show up when a request is made you need to enable it here in the schema
    {
        timestamps: true
    }
);


//DOCUMENT MIDDLEWARE: runs before .save() and .create()
contactSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});




//define the Product Model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;