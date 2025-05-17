const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const { isAdmin } = require('../authMiddleware');  // Middleware para verificar si es admin

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un usuario nuevo en el sistema.
 *     requestBody:
 *       description: Datos del usuario para registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *       400:
 *         description: Datos inválidos o usuario ya existe.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT.
 *     requestBody:
 *       description: Credenciales de usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Obtener usuario actual
 *     description: Devuelve los datos del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: No autorizado, token inválido o expirado.
 */
router.get('/current', currentUser);

module.exports = router;