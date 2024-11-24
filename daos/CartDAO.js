const Cart = require('../models/Cart');

class CartDAO {
    async createCart(cartData) {
        return await Cart.create(cartData);
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async updateCart(id, updateData) {
        return await Cart.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteCart(id) {
        return await Cart.findByIdAndDelete(id);
    }
}

module.exports = new CartDAO();
