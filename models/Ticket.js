const mongoose = require('mongoose');

// Generador único para el campo `code`
const generateCode = () => {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: generateCode,
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now, // Guarda la fecha y hora actual
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Asegurarse de que el monto no sea negativo
    },
    purchaser: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);
