const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const hpp = require('hpp');
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');



//requiring the cookie parser
const cookieParser = require('cookie-parser');


//import global error class
const AppError = require('./utilities/appError');

// //import the global error handler
const globalErrorHandler = require('./controllers/errorController');

//Including session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



const app = express();


//requiring all routes
const productRoutes = require('./routes/productRoute');
const usersRoutes = require('./routes/usersRoute');
const reviewsRoutes = require('./routes/reviewsRoute');
const bannerRoutes = require('./routes/bannerRoute');
const viewsRoutes = require('./routes/viewsRoute');
const contactRoutes = require('./routes/contactRoute');
const commentsRoutes = require('./routes/commentsRoute');
const cartRoutes = require('./routes/cartRoute');





//setting the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


////using cors to set Access-Control-Allow-Origin
app.use(cors());


//registering a middleware for server static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));



//using the helmet to set secure http headers
app.use(helmet());



//Global Middleware registered
//Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};



//using rateLimit
const limiter = rateLimit({
    //set the max depending on your application
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
});


//applying the limiter on only the route that starts with /api
app.use('/api', limiter);





//Middleware registered
//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));


//Data sanitization against NoSql query injection
app.use(mongoSanitizer());

//Data sanitization against XSS
app.use(xss());


app.use(compression());



app.use(session({
    secret: 'mylongsuperfuckingsecretpleasedontcopy',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(function(req, res, next) {
    req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
     next();
 });

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});





//registering the route middleware
//app.use(commentsRoutes);
app.use(productRoutes);
app.use(usersRoutes);
app.use(viewsRoutes);
app.use(reviewsRoutes);
app.use(bannerRoutes);
app.use(contactRoutes);
app.use(cartRoutes);








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