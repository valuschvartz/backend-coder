const express = require('express');
const { currentUser } = require('../authMiddleware'); // Asegúrate de que esta función esté configurada
const Cart = require('../models/Cart');
const router = express.Router();

// Crear un carrito para un usuario
router.post('/', currentUser, async (req, res) => {
    try {
        const userId = req.user._id; // Asegúrate de que el usuario está autenticado

        // Verificar si ya existe un carrito para el usuario
        let cart = await Cart.findOne({ userId });

        if (cart) {
            return res.status(400).json({ message: 'El usuario ya tiene un carrito.' });
        }

        // Crear un nuevo carrito
        cart = new Cart({
            userId,
            products: []
        });

        await cart.save();

        res.status(201).json({
            message: 'Carrito creado con éxito',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
});

module.exports = router;
