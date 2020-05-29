//importing product model
const ContactMessage = require('../models/commentModel');




//creating a single product
exports.postContact = async (req, res, next) => {
    try {
        const newComment = await ContactMessage.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            result: newProduct.length,
            data: {
                newComment
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    };

};


//Get a single comment
exports.getContact = async (req, res, next) => {
    try {

        const comment = await ContactMessage.findOne({ name: req.params.name });
        //Or Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                comment
            }
        });
    } catch (err) {

        //return error to check if product exist
        // next(new AppError(`No product found with ID: ${req.params.id}`, 404));
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};


//Get all comments
exports.getAllContacts = async (req, res, next) => {
    try {

        const allComments = await ContactMessage.find();

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: allComments.length,
            data: {
                allComments
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err
        });
    }


};


