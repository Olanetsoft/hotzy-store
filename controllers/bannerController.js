//importing banner model
const Banner = require('../models/bannerModel');


//creating a single banner product
exports.createBannerProduct = async (req, res, next) => {
    try {
        const newBanner = await Banner.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            data: {
                newBanner
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
        //console.log("FIle not created: " + err);
    };

};