const path = require('path');
const express = require('express');
const morgan = require('morgan');



const app = express();


//registering a middleware for server static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));



//Global Middleware registered
//Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



module.exports = app;