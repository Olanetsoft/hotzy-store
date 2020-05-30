//importing tour model
const Product = require('../models/productModel');

//importing banner model
const Banner = require('../models/bannerModel');


//the home page
exports.homePage = async (req, res, next) => {
    try {
        //1) Get all the tour data from Collection
        const product = await Product.find();

        //2) Build template

        //3) Render template
        res.status(200).render('home', {
            title: 'Home',
            product
        });

    } catch (err) {
        //next(new AppError('failed to get all tour', 404))
        console.log(err)
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};

//Get all Banners
exports.getBanners = async (req, res, next) => {
    try {
        //1) Get all the tour data from Collection
        const allBanner = await Banner.find();
        //2) Build template

        //3) Render template
        res.status(200).render('home', {
            allBanner
        });

    } catch (err) {
        //next(new AppError('failed to get all tour', 404))
        console.log(err)
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};


//Get all premium cat
exports.getPremiumCategory = async (req, res, next) => {
    try {
        //1) Get all the product data from Collection
        const products = await Product.find();
        //2) Build template
        console.log(products)
        //3) Render template
        res.status(200).render('home', {
            products
        });

    } catch (err) {
        //next(new AppError('failed to get all tour', 404))
        console.log(err)
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};