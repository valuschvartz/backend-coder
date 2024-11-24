const express = require('express');
const { currentUser, isUser } = require('../authMiddleware'); // Asegúrate de que isUser esté definido
const Cart = require('../models/Cart');
const { purchaseCart } = require('../controllers/cartController');  // Controlador para finalizar la compra
const Product = require('../models/Product');  // Asegúrate de que el modelo del producto esté importado
const { addProductToCart } = require('../controllers/cartController'); 


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

// Ruta para agregar un producto al carrito
router.post('/:cartId/products', isUser, addProductToCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', isUser, purchaseCart);

module.exports = router;
