const CartRepository = require('../repositories/CartRepository');
const ProductRepository = require('../repositories/ProductRepository');

class CartService {
    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const product = await ProductRepository.findById(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        const productInCart = cart.products.find((item) => item.product.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        const updatedCart = await CartRepository.updateCart(cartId, cart);
        return updatedCart;
    }
}

module.exports = new CartService();
