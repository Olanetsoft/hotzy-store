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
exports.getOtherLayoutsInHomePage = async (req, res, next) => {
    try {
        //1) Get all the product data from Collection
        const products = await Product.find();

        //2) Get all Banner
        const allBanner = await Banner.find();


        //3) Render template
        res.status(200).render('home', {
            products,
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


//Get a single product Details
exports.getProduct = async (req, res, next) => {
    try {

        const singleProduct = await Product.findOne({slug: req.params.slug}).populate({
            path: 'reviews',
            fields: 'reviews rating user'
        });
        //Or Tour.findOne({_id: req.params.id})

        res.status(200).render('product-page', {
            singleProduct
        });



        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         singleProduct
        //     }
        // });
    } catch (err) {

        //return error to check if product exist
        // next(new AppError(`No product found with ID: ${req.params.id}`, 404));
        console.log(err)
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};