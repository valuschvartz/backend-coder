const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const { isAdmin } = require('../authMiddleware');  // Middleware para verificar si es admin

const router = express.Router();  // Crear una instancia de Router

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario actual
router.get('/current', currentUser);

module.exports = router;  // Asegúrate de exportar correctamente el router
