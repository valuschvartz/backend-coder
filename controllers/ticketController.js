const Ticket = require('../models/Ticket');
const CartService = require('../services/cartService');

exports.createTicket = async (req, res) => {
    try {
        const { cartId } = req.params;

        // Obtener el carrito para calcular el total y verificar el comprador
        const cart = await CartService.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        if (!cart.products.length) {
            return res.status(400).json({ message: 'El carrito está vacío, no se puede generar un ticket.' });
        }

        // Calcular el monto total de la compra
        const totalAmount = cart.products.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        // Crear el ticket
        const ticket = new Ticket({
            amount: totalAmount,
            purchaser: req.user.email, // Suponiendo que el usuario autenticado está en req.user
        });

        await ticket.save();

        // Vaciar el carrito después de generar el ticket (opcional)
        await CartService.updateCart(cartId, { products: [] });

        res.status(201).json({ message: 'Ticket creado con éxito', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el ticket', error: error.message });
    }
};
