const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Referencia al producto
        quantity: { type: Number, required: true }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
