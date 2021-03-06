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
const { protect, authorize } = require('../middleware/auth');


// Include other resource routers
const productRouter = require('./products');

const router = express.Router();



// Re-route into other resource routers
router.use('/:storeId/products', productRouter)

router.route('/:id/photo').put(protect, authorize('seller', 'admin'), storePhotoUpload);

router
    .route('/')
    .get(advancedResults(Store, 'products'), getStores)
    .post(protect, authorize('seller', 'admin'), createStore);

router
    .route('/:id')
    .get(getStore)
    .put(protect, authorize('seller', 'admin'), updateStore)
    .delete(protect, authorize('seller', 'admin'), deleteStore);

module.exports = router;