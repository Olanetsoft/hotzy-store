const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


//creating product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name 🤦‍♀️'],
        unique: true,
        trim: true,
        maxlength: [20, 'A product name must have less or equal 20 characters🤦‍♀️'],
        minlength: [5, 'A product name must have more or equal 5 characters🤦‍♀️']
    },
    slug: String,
    categories: {
        type: String,
        required: [true, 'A product must have a Difficulty 😥'],
        //validating the allowed categories
        enum: {
            values: ['standard', 'premium'],
            message: 'Category is either standard, premium'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        //to round up value to nearest value
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price 😥']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                //this wont work on update, only works on new document
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below the regular price'
        }
    },
    image: [String],
    summary: {
        type: String,
        trim: true,
        required: [true, 'A product must have a summary 😥']
    },
    description: {
        type: String,
        trim: true
    },
    specification: [
        {
            Width: String
        },
        {
            Height: String
        },
        {
            Weight: String
        },
        {
            Depth: String
        },
        {
            QualityCheck: String
        },
        {
            EachBoxContains: Number
        }
    ],
    freshnessDuration: {
        type: Number,
        required: [true, 'A product must have a Freshness Duration 😥']
    }
},
    //to make the virtual show up when a request is made you need to enable it here in the schema
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


//to create a virtual document thats not literally in the DB
productSchema.virtual('durationWeeks').get(function () {
    return this.freshnessDuration / 7;
});


//DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});




//define the Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;