const express = require('express');
const { currentUser, isAdmin, isUser } = require('../authMiddleware');
const { createTicket } = require('../controllers/ticketController');
const { 
    registerUser, 
    loginUser, 
    currentUser: getCurrentUser, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Aplicar la estrategia "current" (autenticación y carga de usuario) para las rutas protegidas
router.use(passport.authenticate('jwt', { session: false }), currentUser);

// Ruta para que un usuario cree un ticket de compra (solo para usuarios)
router.post('/ticket', isUser, createTicket);

// Ruta para obtener el usuario actual
router.get('/current', getCurrentUser);

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/', isAdmin, getAllUsers);

// Ruta para actualizar un usuario (solo para administradores)
router.put('/:id', isAdmin, updateUser);

// Ruta para eliminar un usuario (solo para administradores)
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
