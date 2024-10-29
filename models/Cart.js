// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Referencia al modelo User
});

module.exports = mongoose.model('Cart', CartSchema);