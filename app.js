const express = require('express');
const app = express(); // thanks that we can use all kind of utilities and so one

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const morgan = require('morgan'); // this is a package to logging something

// incoming request has to go to app.use
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     })
// }); 

app.use(morgan('dev'));

// routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// it comes here, if there is no products or orders request
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); // it goes to the next app.use()
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;