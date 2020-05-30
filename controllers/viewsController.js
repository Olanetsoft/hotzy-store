//importing tour model
const Product = require('../models/productModel');


//the overview page
exports.homePage = (req, res, next) => {
    res.status(200).render('home', {
        title: 'Home'
       
    });
    
    
    // try {

    //     //1) Get all the tour data from Collection
    //     const Product = await Tour.find();

    //     //2) Build template

    //     //3) Render template
    //     res.status(200).render('home', {
    //         title: 'Home',
    //         Product
    //     });

    // } catch (err) {
    //     //next(new AppError('failed to get all tour', 404))
    //     res.status(404).json({
    //         status: "failed",
    //         message: err
    //     });
    // }

};