const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Asegúrate de que el modelo esté bien importado
const JWT_SECRET = process.env.JWT_SECRET || 'coder123';

// Middleware para cargar el usuario actual (estrategia "current")
exports.currentUser = async (req, res, next) => {
    try {
        // Buscar el token en el encabezado Authorization
        const token = req.headers.authorization?.split(" ")[1];  // Esto es lo que se usa generalmente para pasar el token
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token' });
        }

        // Verificar el token usando JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = user;  // Adjuntar el usuario a la solicitud
        next();  // Continuar al siguiente middleware o controlador
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

        next();  // Continuar al siguiente middleware o controlador
    };
};

// Alias para roles específicos
exports.isUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del header

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = user; // Adjunta el usuario a la solicitud
        next(); // Permite que la solicitud pase al siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
};
exports.isAdmin = (req, res, next) => {
    console.log('Usuario en el middleware de autorización:', req.user);  // Verifica que el usuario esté correctamente adjuntado a la solicitud
    if (req.user && req.user.role === 'admin') {
        return next();  // Si el rol es 'admin', permite la acción
    }
    console.log('Acceso denegado: el usuario no es un administrador');
    return res.status(403).json({ message: 'Acceso denegado: solo administradores pueden realizar esta acción.' });
};

