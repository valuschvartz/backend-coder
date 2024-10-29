const User = require('../models/User');
const Cart = require('../models/Cart'); // Importar el modelo de carrito
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de Usuario
const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newCart = new Cart();
        await newCart.save();

        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: newCart._id
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Login de Usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Obtener Usuario Actual
const currentUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json(req.user);
};

// Obtener Todos los Usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Actualizar Usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Eliminar Usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser, loginUser, currentUser, getAllUsers, updateUser, deleteUser };