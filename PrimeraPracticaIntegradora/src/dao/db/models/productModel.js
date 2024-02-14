//productModel.js
const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    title: { 
        type: String, 
        unique:true, 
        required: true 
    },
    description: { 
        type: String,
        required: true 
    },
    code: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum:['Electrónicos','Vestimenta','Hogar'] 
    },
    thumbnails: [{ 
        type: String, 
        required: true 
    }],
    id: { 
        type: Number,
        unique:true, 
        required: true 
    }
});

const ProductModel = mongoose.model('Product', productModel);

module.exports = ProductModel;
