const express = require('express');
const router = express.Router(); // allows us to handle different routes etc
const Product = require('../models/product');

const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            // docs.length >= 0 ? res.status(200).json(docs) : res.status(404).json({message: 'No entries found'});
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.statas(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    // save is a method provided by mongoose. We can use this method on mongoose models
    // save method will store this object in the database
    product.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /products',
                createProduct: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log('From database:', doc);
            doc ? res.status(200).json(doc) : res.status(404).json({ message: 'No valid data for provided ID' });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });

    // const specialMessage = {
    //     message: 'You discovered the special ID',
    //     id: id
    // };
    // const normalMessage = {
    //     message: 'You passed an ID'
    // };

    // id === 'special' ? res.status(200).json(specialMessage) : res.status(200).json(normalMessage);
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});

module.exports = router;
