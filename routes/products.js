const express = require('express');
const { isAdmin } = require('../authMiddleware');  // Middleware de autorización
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Crear un nuevo producto (solo administradores)
router.post('/', isAdmin, createProduct);

// Actualizar un producto (solo administradores)
router.put('/:id', isAdmin, updateProduct);

// Eliminar un producto (solo administradores)
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;
