const express = require('express');
const { createTicket } = require('../controllers/ticketController');
const { isUser } = require('../authMiddleware');

const router = express.Router();

// Crear un ticket basado en el carrito (solo usuarios)
router.post('/:cartId', isUser, createTicket);

module.exports = router;
