//importing product model
const Product = require('../models/productModel');

//importing Order model
const Order = require('../models/orderModel');


//importing apiFeatures class
const APIFeatures = require('../utilities/apiFeatures');





//middleware to query top 5 cheap tours
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficultly';
    next();
};



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
        //console.log(err)
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};

//Updating a product
exports.updateOneProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true,
            runValidators: true
        });

        // if (!updatedProduct) {
        //     next(new AppError(`No Document found with ID: ${req.params.productId}`, 404));
        // }

        res.status(200).json({
            status: 'success',
            data: {
                data: updatedProduct
            }
        });
    } catch (err) {
        //return error to check if tour is updated
        //next(new AppError('Unable to Update Tour', 404));
        res.status(404).json({
            status: "failed",
            message: err
        });
    };
};

//delete product
exports.deleteOneProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        //return error to check if tour was deleted
        //next(new AppError(`Unable to delete Tour with ID: ${req.params.id}`, 404));
        res.status(404).json({
            status: "failed to delete",
            message: err
        });
    };

};


//using aggregation pipeline
exports.getProductsStats = async (req, res, next) => {
    try {
        const statistics = await Product.aggregate([
            {
                //filtering a certain countDocuments
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$categories' },
                    numOfProducts: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                //1 added is for ascending
                $sort: { avgPrice: 1 }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                statistics
            }
        });

    } catch (err) {
        //return error to check if tour stats exist
        // next(new AppError('Unable to get all Stats', 404));

        res.status(404).json({
            status: "failed to get Stats",
            message: err
        });
    };
};



//All about products to cart
exports.postCart = (req, res, next) => {

    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {


            //SEND RESPONSE IN JSON
            res.status(200).json({
                status: 'success',
                result: result.length,
                data: {
                    result
                }
            });

        });
};



exports.getCart = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;

            //SEND RESPONSE IN JSON
            res.status(200).json({
                status: 'success',
                result: products.length,
                data: {
                    products
                }
            });
        })
        .catch(err => {
            console.log(err)
        });

};


//This deletes CART by id 
exports.postCartDeleteProduct = (req, res, next) => {

    const prodId = req.params.productId;

    req.user
        .removeFromCart(prodId)
        .then(result => {

            //SEND RESPONSE IN JSON
            res.status(204).json({
                status: 'success',
                data: null
            });
        })
        .catch(err => {
            console.log(err)
        });
};




exports.getCheckout = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            let total = 0;
            products.forEach(p => {
                total += p.quantity * p.productId.price;
            });


            //SEND RESPONSE IN JSON
            res.status(200).json({
                status: 'success',
                result: products.length,
                data: {
                    products,
                    totalSum: total
                }
            });

            // res.render('shop/checkout', {
            //     path: '/checkout',
            //     pageTitle: 'Checkout',
            //     products: products,
            //     totalSum: total
            // });
        })
        .catch(err => {
            console.log(err);
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);
        });
};


exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user.id })
        .then(orders => {


            //SEND RESPONSE IN JSON
            res.status(200).json({
                status: 'success',
                result: orders.length,
                data: {
                    orders
                }
            });

            // res.render('shop/orders', {
            //     path: '/orders',
            //     pageTitle: 'Your Orders',
            //     orders: orders
            // });
        })
        .catch(err => {
            console.log(err)
            // //res.redirect('/500');
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);
        });
};