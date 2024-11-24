const Ticket = require('../models/Ticket');

// Obtener todos los tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({
            message: 'Tickets obtenidos con éxito',
            tickets
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tickets', error: error.message });
    }
};

// Obtener un ticket por código
exports.getTicketByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const ticket = await Ticket.findOne({ code });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        res.status(200).json({
            message: 'Ticket obtenido con éxito',
            ticket
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ticket', error: error.message });
    }
};
