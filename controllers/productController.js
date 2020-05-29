//importing product model
const Product = require('../models/productModel');


//importing apiFeatures class
const APIFeatures = require('../utilities/apiFeatures');



//creating a single product
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            result: newProduct.length,
            data: {
                newProduct
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


//get a single product
exports.getProduct = async (req, res, next) => {
    try {

        const singleProduct = await Product.findById(req.params.productId).populate('reviews');
        //Or Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                singleProduct
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


//get all products
exports.getProducts = async (req, res, next) => {
    try {
        //EXECUTE THE QUERY_OBJ
        const features = new APIFeatures(Product.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const allProducts = await features.query;

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success',
            result: allProducts.length,
            data: {
                allProducts
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