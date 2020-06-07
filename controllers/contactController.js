//importing product model
const Contact = require('../models/contactModel');




//creating a single contact
exports.postContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newContact
            }

        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'failed',
            message: err
        })
    };

};


//Get a single comment
exports.getContact = async (req, res, next) => {
    try {

        const comment = await Contact.findOne({ name: req.params.name });
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

        const allComments = await Contact.find();

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


