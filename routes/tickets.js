const express = require('express');
const { getAllTickets, getTicketByCode } = require('../controllers/ticketController');
const { currentUser } = require('../authMiddleware');

const router = express.Router();

// Ruta para obtener todos los tickets
router.get('/', currentUser, getAllTickets);

// Ruta para obtener un ticket por código
router.get('/:code', currentUser, getTicketByCode);

module.exports = router;
