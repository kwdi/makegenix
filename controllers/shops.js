
// @desc Get all shops
// @route GET /api/v1/shops
// @access Public
exports.getShops = (req, res, next ) => {
    res.status(200).json({success: true, msg: 'Show all shops'});
}


// @desc Get single shop
// @route GET /api/v1/shops/:id
// @access Public
exports.getShop = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Show shop ${req.params.id}` });
}

// @desc Create new shop
// @route POST /api/v1/shops/:id
// @access Private
exports.createShop = (req, res, next ) => {
    res.status(200).json({success: true, msg: 'Create new shop'});
}

// @desc Update shop
// @route PUT /api/v1/shops/:id
// @access Private
exports.updateShop = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Update shop ${req.params.id}` });
}

// @desc Delete single shop
// @route DELETE /api/v1/shops/:id
// @access Private
exports.deleteShop = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Delete shop ${req.params.id}` });
}