const BaseRepository = require('./BaseRepository');
const TicketDAO = require('../daos/TicketDAO');

class TicketRepository extends BaseRepository {
    constructor() {
        super(TicketDAO);
    }

    /**
     * Crear un nuevo ticket.
     * @param {Object} ticketData - Datos del ticket.
     * @returns {Object} - Ticket creado.
     */
    async createTicket(ticketData) {
        return await this.dao.create(ticketData);
    }

    /**
     * Obtener un ticket por su ID.
     * @param {String} id - ID del ticket.
     * @returns {Object} - Ticket encontrado.
     */
    async findById(id) {
        return await this.dao.findById(id);
    }

    /**
     * Obtener todos los tickets.
     * @returns {Array} - Lista de tickets.
     */
    async findAll() {
        return await this.dao.findAll();
    }
}

module.exports = new TicketRepository();
