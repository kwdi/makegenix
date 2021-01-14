const Shop = require('../models/Shop');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");


// @desc Get all shops
// @route GET /api/v1/shops
// @access Public
exports.getShops = asyncHandler ( async (req, res, next ) => {
   
    const shops = await Shop.find();
    res.status(200).json({success: true, count: shops.length , data: shops});
   
});


// @desc Get single shop
// @route GET /api/v1/shops/:id
// @access Public
exports.getShop = asyncHandler ( async (req, res, next ) => {

    const shop = await Shop.findById(req.params.id);

    if(!shop){
       return  next(new ErrorResponse(`Shop not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, data: shop });
});

// @desc Create new shop
// @route POST /api/v1/shops/:id
// @access Private
exports.createShop = asyncHandler ( async (req, res, next ) => {
   
    const shop = await Shop.create(req.body);
    
    res.status(201).json({
        success: true,
        data: shop
    })
   
});

// @desc Update shop
// @route PUT /api/v1/shops/:id
// @access Private
exports.updateShop = asyncHandler ( async (req, res, next ) => {

    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!shop){
        return  res.status(400).json({success: false})
     }

    res.status(200).json({success: true, data: shop });

});

// @desc Delete single shop
// @route DELETE /api/v1/shops/:id
// @access Private
exports.deleteShop = asyncHandler ( async (req, res, next ) => {
    
    const shop = await Shop.findByIdAndDelete(req.params.id)
    
    if(!shop){
        return  res.status(400).json({success: false})
     }


     res.status(200).json({success: true, data: {} });
});