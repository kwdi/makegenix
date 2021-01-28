const path = require('path');
const Store = require('../models/Store');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require("../utils/errorResponse");


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
    
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published store
    const publishedStore = await Store.findOne({ user: req.user.id});

    //If the user is not an admin, they can only add one store
    if(publishedStore && req.user.role !== 'admin'){
        return next (new ErrorResponse(`The user with ID ${req.user.id} has already publised a Store`, 400));
    }

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

    let store = await Store.findById(req.params.id);

    if(!store){
        return  res.status(400).json({success: false})
     }

    // Make sure user is store owner
    if(store.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.params.id} is not authorized to update this store`, 401)
        );
    }

    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


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

     // Make sure user is store owner
     if(store.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.params.id} is not authorized to delete this store`, 401)
        );
    }

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

    // Make sure user is store owner
    if(store.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.params.id} is not authorized to update this store`, 401)
        );
    }
 


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