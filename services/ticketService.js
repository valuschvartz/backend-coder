const TicketRepository = require('../repositories/TicketRepository');
const TicketDTO = require('../dtos/TicketDTO');

class TicketService {
    async createTicket(ticketData) {
        const newTicket = await TicketRepository.create(ticketData);
        return new TicketDTO(newTicket);
    }
}

module.exports = new TicketService();
