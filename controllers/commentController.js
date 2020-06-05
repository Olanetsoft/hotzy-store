
//importing product model
const Comment = require('../models/commentModel');

//importing apiFeatures class
const APIFeatures = require('../utilities/apiFeatures');



//import AppError
const AppError = require('../utilities/appError');




//creating a single comment
exports.postComment= async (req, res, next) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            data: {
                newComment
            }

        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    };

};



//Get all comments
exports.getAllComments = async (req, res, next) => {
    try {
        let filter = {};
        //this is added to check if the params include productId then it should return comments with respect to the productId else return all comments
        if (req.params.productId) filter = { product: req.params.productId }

        //EXECUTE THE QUERY_OBJ
        const features = new APIFeatures(Comment.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const allComments = await features.query;

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: allComments.length,
            data: {
                allComments
            }
        });

    } catch (err) {
        //console.log(err)
        next(new AppError('Trying to get all comment failed', 404))

    }
};
