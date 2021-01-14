const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");


// @desc Get products
// @route GET /api/v1/products
// @route GET /api/v1/shops/:shopId/products
// @access Public

exports.getProducts = asyncHandler(async (req, res, next) =>{
    let query;

    if(req.params.shopId){
        query = Product.find({shop: req.params.shopId});
    } else {
        query = Product.find().populate({
            path: 'shop',
            select: 'name description'
            
        });
    }

    const products = await query;
      
    res.status(200).json({ success: true, count: products.length, data: products})
})