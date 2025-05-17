const express = require('express');
const { getAllTickets, getTicketByCode } = require('../controllers/ticketController');
const { currentUser } = require('../authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Obtener todos los tickets
 *     description: Retorna un listado con todos los tickets del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: No autorizado.
 */
router.get('/', currentUser, getAllTickets);

/**
 * @swagger
 * /tickets/{code}:
 *   get:
 *     summary: Obtener un ticket por código
 *     description: Retorna los detalles de un ticket específico dado su código.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Código único del ticket
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket encontrado y retornado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Ticket no encontrado.
 */
router.get('/:code', currentUser, getTicketByCode);

module.exports = router;