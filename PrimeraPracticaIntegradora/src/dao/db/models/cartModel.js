//cartModel.js
const mongoose = require('mongoose');
const cartModel = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    products: [{
        product: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const CartModel = mongoose.model('Order', cartModel);

module.exports = CartModel;