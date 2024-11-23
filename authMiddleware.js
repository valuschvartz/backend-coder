// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Asegúrate de que el modelo está bien importado
const JWT_SECRET = process.env.JWT_SECRET || 'coder123';

// Middleware para cargar el usuario actual (estrategia "current")
exports.currentUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = user; // Adjuntar el usuario a la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ message: 'Error en la autenticación', error: error.message });
    }
};

// Middleware genérico para verificar roles
exports.authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: `Acceso denegado. Se requiere rol de ${role}.`
            });
        }

        next(); // Continuar al siguiente middleware o controlador
    };
};

// Alias para roles específicos
exports.isAdmin = exports.authorizeRole('admin');
exports.isUser = exports.authorizeRole('user');
