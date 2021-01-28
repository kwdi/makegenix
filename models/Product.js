const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a product title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a product price']
    },
    freeshipping: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    store: {
         type: mongoose.Schema.ObjectId,
         ref: 'Store',
         required: true
     },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);