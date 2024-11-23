// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Referencia al modelo Cart
    role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);

