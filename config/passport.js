// passport.js
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User'); // Ajusta la ruta si es necesario

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer token del encabezado Authorization
    secretOrKey: 'coder123', // Clave secreta
};

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
