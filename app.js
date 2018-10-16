const express = require('express');
const app = express(); // thanks that we can use all kind of utilities and so one

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const morgan = require('morgan'); // this is a package to logging something
const bodyParser = require('body-parser');

// incoming request has to go to app.use
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     })
// }); 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Contetn-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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