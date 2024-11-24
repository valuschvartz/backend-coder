const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'coder123';  // Usar una variable de entorno en producción

// Registro de un nuevo usuario
exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        // Agregar un console.log para ver qué está llegando en la solicitud
        console.log('Datos recibidos:', req.body);
        console.log('Contraseña recibida:', password);  // Verificar la contraseña

        // Verificar que la contraseña no esté vacía
        if (!password) {
            return res.status(400).json({ message: 'La contraseña es requerida.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Crear el nuevo usuario
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: 'user', // Por defecto, todos son usuarios
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
        console.error('Error al registrar el usuario:', error);  // Log para más detalles
        res.status(500).json({
            message: 'Error al registrar el usuario.',
            error: error.message || 'Error desconocido',  // Proporcionamos más detalles del error
        });
    }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Datos de inicio de sesión:', req.body);  // Log de los datos de login
        console.log('Contraseña de inicio de sesión:', password);  // Verificar la contraseña en login

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
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
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
    }
};

// Obtener el usuario actual
exports.currentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        res.status(401).json({ message: 'Token inválido.', error: error.message });
    }
};
