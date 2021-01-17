const express = require('express');
const { 
    getStores, 
    getStore, 
    createStore, 
    updateStore, 
    deleteStore,
    storePhotoUpload
} = require('../controllers/stores');

const Store = require('../models/Store');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


// Include other resource routers
const productRouter = require('./products');

const router = express.Router();



// Re-route into other resource routers
router.use('/:storeId/products', productRouter)

router.route('/:id/photo').put(protect, storePhotoUpload);

router
    .route('/')
    .get(advancedResults(Store, 'products'), getStores)
    .post(protect, createStore);

router
    .route('/:id')
    .get(getStore)
    .put(protect, updateStore)
    .delete(protect, deleteStore);

module.exports = router;