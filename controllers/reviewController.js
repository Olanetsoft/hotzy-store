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


//Get all reviews
exports.getAllReviews = async (req, res, next) => {
    try {
        let filter = {};
        //this is added to che if the params include tourId then is should return reviews with respect to the tourId else return all reviews
        if (req.params.tourId) filter = { tour: req.params.tourId }

         //EXECUTE THE QUERY_OBJ
         const features = new APIFeatures(Review.find(filter), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();

        const allReviews = await features.query;

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: allReviews.length,
            data: {
                allReviews
            }
        });

    } catch (err) {
        next(new AppError('Trying to get all reviews failed', 404))

    }
};



//get single review
exports.getSingleReview = async (req, res, next) => {
    try {
        const singleReview = await Review.findById(req.params.id);

        //Or Review.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                singleReview
            }
        });
    } catch (err) {
        //return error to check if tour exist
        next(new AppError(`No Review found with ID: ${req.params.id}`, 404));
    }
};




//Updating a review
exports.updateReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!review) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        
        res.status(200).json({
           
            status: 'success',
            data: {
                review
            }
        });
    } catch (err) {
        console.log(err);
        //return error to check if review is updated
        next(new AppError('Unable to Update Review', 404));
    };
};




//Deleting a Review
exports.deleteReview = async (req, res, next) => {
    try {
        const doc = await Review.findByIdAndDelete(req.params.id);

        if (!doc) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        //return error to check if review was deleted
        next(new AppError(`Unable to delete Document with ID: ${req.params.id}`, 404));
    };
};

