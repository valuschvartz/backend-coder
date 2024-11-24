const Cart = require('../models/Cart');
const Ticket = require('../models/Ticket');

// Agregar producto al carrito
exports.addProductToCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Verifica si el producto ya está en el carrito
        const existingProduct = cart.products.find(item => item.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
    }
};

// Finalizar compra
exports.purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const productsToPurchase = [];
        const productsWithoutStock = [];

        for (const cartProduct of cart.products) {
            const product = cartProduct.product;
            const requestedQuantity = cartProduct.quantity;

            if (product.stock >= requestedQuantity) {
                product.stock -= requestedQuantity;
                await product.save();

                totalAmount += product.price * requestedQuantity;

                productsToPurchase.push({
                    productId: product._id,
                    quantity: requestedQuantity,
                });
            } else {
                productsWithoutStock.push(product._id);
            }
        }

        let ticket = null;
        if (productsToPurchase.length > 0) {
            ticket = await Ticket.create({
                amount: totalAmount,
                purchaser: req.user.email,
            });
        }

        cart.products = cart.products.filter(cartProduct =>
            productsWithoutStock.includes(cartProduct.product._id)
        );
        await cart.save();

        res.status(200).json({
            message: ticket
                ? 'Compra completada con éxito. Algunos productos no se pudieron procesar.'
                : 'No se pudo completar la compra. Ningún producto tenía stock suficiente.',
            ticket,
            productsNotProcessed: productsWithoutStock,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
    }
};
