class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map((item) => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
        }));
        this.total = this.products.reduce((sum, item) => sum + item.quantity * item.price, 0);
    }
}

module.exports = CartDTO;
