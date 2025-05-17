const Ticket = require('../models/Ticket');
const CustomError = require('../routes/CustomError');

// Obtener todos los tickets
exports.getAllTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({
            message: 'Tickets obtenidos con éxito',
            tickets
        });
    } catch (error) {
        next(new CustomError('TICKETS_FETCH_FAILED'));
    }
};

// Obtener un ticket por código
exports.getTicketByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const ticket = await Ticket.findOne({ code });

        if (!ticket) {
            throw new CustomError('TICKET_NOT_FOUND');
        }

        res.status(200).json({
            message: 'Ticket obtenido con éxito',
            ticket
        });
    } catch (error) {
        next(error);
    }
};