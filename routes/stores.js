const express = require('express');
const { 
    getStores, 
    getStore, 
    createStore, 
    updateStore, 
    deleteStore 
} = require('../controllers/stores');

// Include other resource routers
const productRouter = require('./products');

const router = express.Router();


// Re-route into other resource routers
router.use('/:storeId/products', productRouter)


router
    .route('/')
    .get(getStores)
    .post(createStore);

router
    .route('/:id')
    .get(getStore)
    .put(updateStore)
    .delete(deleteStore);

module.exports = router;