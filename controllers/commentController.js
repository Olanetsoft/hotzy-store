
//importing product model
const Comment = require('../models/commentModel');






//creating a single contact
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
