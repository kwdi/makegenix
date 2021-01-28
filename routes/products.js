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

const { protect, authorize } = require('../middleware/auth');


router
    .route('/')
    .get(advancedResults(Product, {
        path: 'store',
        select: 'name description'
    }), getProducts)
    .post(protect, authorize('seller', 'admin'), addProduct);


router
    .route('/:id')
    .get(getProduct)
    .put(protect, authorize('seller', 'admin'), updateProduct)
    .delete(protect, authorize('seller', 'admin'), deleteProduct);

module.exports = router;