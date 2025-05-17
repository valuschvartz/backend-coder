const passport = require('passport');  // Importa Passport
const express = require('express');
const { isAdmin } = require('../authMiddleware');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Obtiene un producto específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto. Solo accesible para administradores autenticados.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del producto para crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza un producto existente. Solo accesible para administradores autenticados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nuevos datos para el producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: Producto no encontrado.
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente. Solo accesible para administradores autenticados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteProduct);

module.exports = router;