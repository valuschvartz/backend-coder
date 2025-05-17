const express = require('express');
const { currentUser, isUser } = require('../authMiddleware');
const Cart = require('../models/Cart');
const { purchaseCart, addProductToCart } = require('../controllers/cartController');
const Product = require('../models/Product');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Gestión de carritos de compra
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un carrito para un usuario
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Carrito creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: El usuario ya tiene un carrito
 *       500:
 *         description: Error al crear el carrito
 */
router.post('/', currentUser, async (req, res) => {
    try {
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            return res.status(400).json({ message: 'El usuario ya tiene un carrito.' });
        }

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

/**
 * @swagger
 * /api/carts/{cartId}/products:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     requestBody:
 *       description: Datos del producto a agregar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *       400:
 *         description: Error al agregar producto
 *       401:
 *         description: No autorizado
 */
router.post('/:cartId/products', isUser, addProductToCart);

/**
 * @swagger
 * /api/carts/{cid}/purchase:
 *   post:
 *     summary: Finalizar la compra del carrito
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Compra finalizada con éxito
 *       400:
 *         description: Error al finalizar la compra
 *       401:
 *         description: No autorizado
 */
router.post('/:cid/purchase', isUser, purchaseCart);

module.exports = router;