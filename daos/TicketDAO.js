const Ticket = require('../models/Ticket');

class TicketDAO {
    async createTicket(ticketData) {
        return await Ticket.create(ticketData);
    }

    async getTicketById(id) {
        return await Ticket.findById(id).populate('purchaser');
    }

    async getAllTickets() {
        return await Ticket.find().populate('purchaser');
    }
}

module.exports = new TicketDAO();
