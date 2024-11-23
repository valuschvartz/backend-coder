// routes/ticketRouter.js
const express = require('express');
const ticketController = require('../controllers/ticketController');
const { isUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', isUser, ticketController.createTicket);

module.exports = router;