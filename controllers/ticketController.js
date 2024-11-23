// controllers/ticketController.js
const Ticket = require('../models/Ticket');
const Cart = require('../models/Cart');

exports.createTicket = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const totalAmount = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);

        const ticket = new Ticket({
            amount: totalAmount,
            purchaser: userEmail
        });

        await ticket.save();
        res.status(201).json({ message: 'Compra formalizada exitosamente', ticket });
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ message: 'Error al formalizar la compra' });
    }
};