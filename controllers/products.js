const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");
const Store = require('../models/Store');


// @desc Get products
// @route GET /api/v1/products
// @route GET /api/v1/stores/:storeId/products
// @access Public

exports.getProducts = asyncHandler(async (req, res, next) =>{
    
    if(req.params.storeId){
        const products = Product.find({store: req.params.storeId});
        
        return res.status(200).json({
            success: true, count: products.length, data: products
        }); 
    } else {
        
        res.status(200).json(res.advancedResults);
    }

});

// @desc Get products
// @route GET /api/v1/product/:id
// @access Public

exports.getProduct = asyncHandler(async (req, res, next) =>{
    
    const product = await Product.findById(req.params.id).populate({ 
        path: 'store', 
        select: 'name description'
    });

    if(!Product){
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
    }
      
    res.status(200).json({ success: true, data: product})
})

// @desc Add products
// @route GET /api/v1/stores/:storeId/products
// @access Private

exports.addProduct = asyncHandler(async (req, res, next) =>{
    
    req.body.store = req.params.storeId;

    const store = await Store.findById(req.params.storeId);

    if(!store){
        return next(new ErrorResponse(`Product not found with id of ${req.params.storeid}`, 404))
    }
      
    const product = await Product.create(req.body);


    res.status(200).json({ success: true, data: product})
})

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) =>{
    

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
    }
      
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: product})

});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) =>{
    

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
    }
      
    await product.remove();

    res.status(200).json({ success: true, data: {}})

});
