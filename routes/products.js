const passport = require('passport');  // Importa Passport
const express = require('express');
const { isAdmin } = require('../authMiddleware');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Crear un nuevo producto (solo administradores)
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, createProduct);

// Actualizar un producto (solo administradores)
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateProduct);

// Eliminar un producto (solo administradores)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteProduct);

module.exports = router;
