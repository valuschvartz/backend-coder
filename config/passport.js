const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extrae el token del header Authorization
    secretOrKey: process.env.JWT_SECRET || 'coder123',  // La clave secreta usada para verificar el token
};

module.exports = passport => {
    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            console.log('JWT Payload:', jwtPayload);  // Verifica el contenido del JWT
            const user = await User.findById(jwtPayload.id);  // Busca al usuario usando el id del JWT

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            return done(null, user);  // Si el usuario existe, lo pasa al siguiente middleware
        } catch (error) {
            console.log('Error en Passport:', error);  // Imprime los errores si hay problemas con el JWT
            return done(error, false);
        }
    }));
};
