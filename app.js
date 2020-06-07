const path = require('path');
const express = require('express');
const morgan = require('morgan');

//requiring the cookie parser
const cookieParser = require('cookie-parser');


//import global error class
const AppError = require('./utilities/appError');

// //import the global error handler
const globalErrorHandler = require('./controllers/errorController');



const app = express();


//requiring all routes
const productRoutes = require('./routes/productRoute');
const usersRoutes = require('./routes/usersRoute');
const reviewsRoutes = require('./routes/reviewsRoute');
const bannerRoutes = require('./routes/bannerRoute');
const viewsRoutes = require('./routes/viewsRoute');
const contactRoutes = require('./routes/contactRoute');
const commentsRoutes = require('./routes/commentsRoute');





//setting the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//registering a middleware for server static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));



//Global Middleware registered
//Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


//Middleware registered
//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));







//registering the route middleware
app.use(commentsRoutes);
app.use(productRoutes);
app.use(usersRoutes);
app.use(viewsRoutes);

app.use(reviewsRoutes);

app.use(bannerRoutes);

app.use(contactRoutes);








//Implement a handler to handle all non-existing route
app.all('*', (req, res, next) => {
    // const err = new Error(`Sorry can't find ${req.originalUrl} on the server😫😫`);
    // err.status = 'fail';
    // err.statusCode = 400;
    next(new AppError(`Sorry can't find ${req.originalUrl} on the server😫😫`, 404))
});


//error handling middleware
app.use(globalErrorHandler);


module.exports = app;