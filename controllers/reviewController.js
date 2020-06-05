//importing Review model
const Review = require('../models/reviewModel');

//importing apiFeatures class
const APIFeatures = require('../utilities/apiFeatures');

//import AppError
const AppError = require('../utilities/appError');



//create a new review
exports.createReview = async (req, res, next) => {
    try {

        //Allow nested route
        //Also set the tour an user from the params if its not passed to the body
        if (!req.body.tour) req.body.tour = req.params.tourId;
        if (!req.body.user) req.body.user = req.user.id;

        const newReview = await Review.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                newReview
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'failed 🤷‍♀️',
            message: err
        })
    };
};
