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


// Include other resource routers
const productRouter = require('./products');

const router = express.Router();



// Re-route into other resource routers
router.use('/:storeId/products', productRouter)

router.route('/:id/photo').put(storePhotoUpload);

router
    .route('/')
    .get(advancedResults(Store, 'products'), getStores)
    .post(createStore);

router
    .route('/:id')
    .get(getStore)
    .put(updateStore)
    .delete(deleteStore);

module.exports = router;