const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');  // Asegúrate de que el modelo esté bien importado
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extrae el token desde el header 'Authorization'
    secretOrKey: process.env.JWT_SECRET || 'coder123',  // Usa la variable de entorno o una clave secreta por defecto
};

module.exports = passport => {
    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            console.log('JWT Payload:', jwtPayload);  // Para verificar si el payload se está extrayendo correctamente
            const user = await User.findById(jwtPayload.id);  // Busca al usuario por el ID del JWT

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });  // Si el usuario no existe, retorna false
            }

            return done(null, user);  // Si el usuario existe, lo pasa al siguiente middleware
        } catch (error) {
            return done(error, false);  // Si hay un error en la verificación, retorna el error
        }
    }));
};
