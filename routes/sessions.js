const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * @swagger
 * /sessions/current:
 *   get:
 *     summary: Obtener usuario autenticado actual
 *     description: Devuelve los datos del usuario actualmente autenticado mediante JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario autenticado con éxito
 *                 user:
 *                   type: object
 *                   description: Datos del usuario autenticado
 *       401:
 *         description: No autorizado, token inválido o expirado.
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        message: 'Usuario autenticado con éxito',
        user: req.user, // El usuario autenticado se adjunta a req.user
    });
});

module.exports = router;