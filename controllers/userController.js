const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../routes/CustomError');

const JWT_SECRET = process.env.JWT_SECRET || 'coder123';

// Registro de un nuevo usuario
exports.registerUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!password) {
            throw new CustomError('PASSWORD_REQUIRED');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomError('EMAIL_ALREADY_EXISTS');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: 'user',
        });

        res.status(201).json({
            message: 'Usuario registrado con éxito.',
            user: {
                id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Inicio de sesión
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError('USER_NOT_FOUND');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new CustomError('INVALID_PASSWORD');
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Obtener el usuario actual
exports.currentUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new CustomError('TOKEN_NOT_PROVIDED');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new CustomError('USER_NOT_FOUND');
        }

        res.status(200).json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
};