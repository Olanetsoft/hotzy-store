//importing tour model
const Product = require('../models/productModel');

//importing banner model
const Banner = require('../models/bannerModel');

//importing Comment model
const Comment = require('../models/commentModel');

//importing Comment model
const Contact = require('../models/contactModel');

//import AppError
const AppError = require('../utilities/appError');


var Cart = require('../models/cartModel');



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

        //const newComment = await Comment.find()
        const singleProduct = await Product.findOne({ slug: req.params.slug }).populate({
            path: 'reviews',
            fields: 'reviews rating user'
        })
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



//login
exports.loginUser = (req, res, next) => {
    res.status(200).render('login', {
        title: 'Login'
    });
};


//signup
exports.signup = (req, res, next) => {
    res.status(200).render('signup', {
        title: 'Signup'
    });
};


//contact
exports.getContactPage = (req, res, next) => {
    res.status(200).render('contact', {
        title: 'Contact Us'
    });
};

//order
exports.getOrderPage = (req, res, next) => {
    res.status(200).render('order', {
        title: 'My Order'
    });
};


//cart
// exports.getCartPage = (req, res, next) => {
//     //if (!req.user) res.redirect('/login')
//     req.user
//         .populate('cart.items.productId')
//         .execPopulate()
//         .then(user => {

//             const products = user.cart.items;

//             let total = 0;
//             products.forEach(p => {
//                 total += p.quantity * p.productId.price;
//             });

//             //console.log(products)
//             res.status(200).render('cart', {
//                 title: 'My Cart',
//                 products,
//                 total,
//                 //totalSum
//             });
//         })
//         .catch(err => {
//             console.log(err)
//         });

// };


//cart
exports.getCheckout = (req, res, next) => {
    // if (!req.user) res.redirect('/login')
    // req.user
    //     .populate('cart.items.productId')
    //     .execPopulate()
    //     .then(user => {

    //         const products = user.cart.items;

    //         let total = 0;
    //         products.forEach(p => {
    //             total += p.quantity * p.productId.price;
    //         });

    //         res.status(200).render('checkout', {
    //             products,
    //             total,
    //             //totalSum
    //             title: 'checkout page'
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });

    if (!req.session.cart) {
        return res.render('shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    res.render('checkout', {

        products: cart.generateArray(),
        totalPrice: cart.totalPrice

    });
};




















// //update details
// exports.postContact = async (req, res, next) => {

//     try {
//         const newContact = await Contact.create(req.body);
//         res.status(201).json({
//             status: 'success 🙌',
//             result: newContact.length,
//             data: {
//                 newComment
//             }

//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'failed',
//             message: err
//         })
//         //console.log("FIle not created: " + err);
//     };
// };