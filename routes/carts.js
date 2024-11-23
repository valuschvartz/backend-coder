const express = require('express');
const Cart = require('../models/Cart'); // Modelo del carrito
const Ticket = require('../models/Ticket'); // Modelo de tickets
const router = express.Router();

router.post('/:cid/purchase', async (req, res) => {
    try {
        const { cid } = req.params;

        // Buscar el carrito por ID
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const productsToPurchase = [];
        const productsWithoutStock = [];

        // Verificar el stock de los productos
        for (const cartProduct of cart.products) {
            const product = cartProduct.product;
            const requestedQuantity = cartProduct.quantity;

            if (product.stock >= requestedQuantity) {
                // Restar del stock y calcular el monto total
                product.stock -= requestedQuantity;
                await product.save();

                totalAmount += product.price * requestedQuantity;

                // Guardar productos comprados
                productsToPurchase.push({
                    productId: product._id,
                    quantity: requestedQuantity,
                });
            } else {
                // Guardar productos no procesados por falta de stock
                productsWithoutStock.push(product._id);
            }
        }

        // Crear el ticket si hay productos comprados
        let ticket = null;
        if (productsToPurchase.length > 0) {
            ticket = await Ticket.create({
                amount: totalAmount,
                purchaser: req.user.email, // Se asume que req.user tiene los datos del usuario autenticado
            });
        }

        // Actualizar el carrito para que contenga solo productos no comprados
        cart.products = cart.products.filter(cartProduct =>
            productsWithoutStock.includes(cartProduct.product._id)
        );
        await cart.save();

        // Respuesta final
        res.status(200).json({
            message: ticket
                ? 'Compra completada con éxito. Algunos productos no se pudieron procesar.'
                : 'No se pudo completar la compra. Ningún producto tenía stock suficiente.',
            ticket,
            productsNotProcessed: productsWithoutStock, // IDs de productos sin stock
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al procesar la compra.',
            error: error.message,
        });
    }
});

module.exports = router;
