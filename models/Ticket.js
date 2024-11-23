// models/Ticket.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => uuidv4(), // Genera un código único automáticamente
        unique: true,
        required: true, // Asegura que siempre haya un valor en este campo
    },
    purchase_datetime: {
        type: Date,
        default: Date.now, // Autogenera la fecha y hora de la compra
        required: true, // Asegura que el campo sea obligatorio
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio'], // Mensaje personalizado
        min: [0, 'El monto no puede ser negativo'], // Validación para evitar números negativos
    },
    purchaser: {
        type: String,
        required: [true, 'El correo del comprador es obligatorio'], // Mensaje personalizado
        validate: {
            validator: function (email) {
                // Validación básica para correos electrónicos
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            },
            message: (props) => `${props.value} no es un correo válido.`, // Mensaje de error para correos no válidos
        },
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);
