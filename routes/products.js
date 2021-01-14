const express = require('express');
const { 
    getProducts, 
    getProduct, 
    addProduct, 
    updateProduct,
    deleteProduct} = require('../controllers/products');

const Product = require('../models/Product');
const advacedResults = require('../middleware/advancedResults');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({mergeParams: true});



router
    .route('/')
    .get(advancedResults(Product, {
        path: 'store',
        select: 'name description'
    }), getProducts)
    .post(addProduct);


router
    .route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;