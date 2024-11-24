const express = require('express');
const passport = require('passport');

const router = express.Router();

// Ruta protegida que devuelve los datos del usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        message: 'Usuario autenticado con éxito',
        user: req.user, // El usuario autenticado se adjunta a req.user
    });
});

module.exports = router;
