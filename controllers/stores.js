const path = require('path');
const Store = require('../models/Store');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");

1
// @desc Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = asyncHandler ( async (req, res, next ) => {
    
    res.status(200).json(res.advancedResults);

   
});


// @desc Get single store
// @route GET /api/v1/stores/:id
// @access Public
exports.getStore = asyncHandler ( async (req, res, next ) => {

    const store = await Store.findById(req.params.id);

    if(!store){
       return  next(new ErrorResponse(`Store not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, data: store });
});

// @desc Create new store
// @route POST /api/v1/stores/:id
// @access Private
exports.createStore = asyncHandler ( async (req, res, next ) => {
   
    const store = await Store.create(req.body);
    
    res.status(201).json({
        success: true,
        data: store
    })
   
});

// @desc Update store
// @route PUT /api/v1/stores/:id
// @access Private
exports.updateStore = asyncHandler ( async (req, res, next ) => {

    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!store){
        return  res.status(400).json({success: false})
     }

    res.status(200).json({success: true, data: store });

});

// @desc Delete single store
// @route DELETE /api/v1/stores/:id
// @access Private
exports.deleteStore = asyncHandler ( async (req, res, next ) => {
    
    const store = await Store.findById(req.params.id)
    
    if(!store){
        return  res.status(400).json({success: false})
     }

    store.remove();

    res.status(200).json({success: true, data: {} });
});


// @desc Upload photo for store
// @route PUT /api/v1/stores/:id/photo
// @access Private
exports.storePhotoUpload = asyncHandler ( async (req, res, next ) => {
    
    const store = await Store.findById(req.params.id)
    
    if(!store){
        return  res.status(400).json({success: false})
     }

    store.remove();

    if(!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    
    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${store._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err){
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Store.findByIdAndUpdate(req.params.id, {photo: file.name});
        
        res.status(200).json({
            success: true,
            data: file.name
        })
    });

});