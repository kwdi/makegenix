const Shop = require('../models/Shop')


// @desc Get all shops
// @route GET /api/v1/shops
// @access Public
exports.getShops = async (req, res, next ) => {
    
    const shops = await Shop.find();


    res.status(200).json({success: true, count: shops.length , data: shops});

    // res.status(400).json({success: false})
}


// @desc Get single shop
// @route GET /api/v1/shops/:id
// @access Public
exports.getShop = async (req, res, next ) => {

    const shop = await Shop.findById(req.params.id);

    if(!shop){
       return  res.status(400).json({success: false})
    }
    res.status(200).json({success: true, data: shop });

    //res.status(400).json({success: false})
}

// @desc Create new shop
// @route POST /api/v1/shops/:id
// @access Private
exports.createShop = async (req, res, next ) => {
    try{
        const shop = await Shop.create(req.body);
    
    res.status(201).json({
        success: true,
        data: shop
    })
    }catch(err) {
        res.status(400).json({success: false})
    }  
}

// @desc Update shop
// @route PUT /api/v1/shops/:id
// @access Private
exports.updateShop = async (req, res, next ) => {

    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!shop){
        return  res.status(400).json({success: false})
     }

    res.status(200).json({success: true, data: shop });

    //res.status(400).json({success: false})
}

// @desc Delete single shop
// @route DELETE /api/v1/shops/:id
// @access Private
exports.deleteShop = async (req, res, next ) => {
    
    const shop = await Shop.findByIdAndDelete(req.params.id)
    
    if(!shop){
        return  res.status(400).json({success: false})
     }


    res.status(200).json({success: true, data: {} });
}