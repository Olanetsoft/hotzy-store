const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


//creating product model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A must have a name 🤦‍♀️'],
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'A subject must have a name 🤦‍♀️'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'A message must have a name 🤦‍♀️'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Please provide an email 😥'],
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