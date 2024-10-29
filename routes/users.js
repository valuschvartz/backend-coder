const express = require('express');
const { 
    registerUser, 
    loginUser, 
    currentUser, 
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

// Ruta para obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

// Ruta para obtener todos los usuarios
router.get('/', passport.authenticate('jwt', { session: false }), getAllUsers);

// Ruta para actualizar un usuario
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

module.exports = router;