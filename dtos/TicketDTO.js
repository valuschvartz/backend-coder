class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.code = ticket.code;
        this.purchaseDate = ticket.purchase_datetime;
        this.total = ticket.amount;
        this.purchaser = {
            id: ticket.purchaser._id,
            email: ticket.purchaser.email,
        };
    }
}

module.exports = TicketDTO;
