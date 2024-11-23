// app.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts'); // Agregar las rutas de los carritos
const ticketRoutes = require('./routes/tickets'); // Agregar las rutas de los tickets
const passportConfig = require('./config/passport');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

// Configurar Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
passportConfig(passport);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Usar las rutas
app.use('/api/users', userRoutes);   // Rutas de usuario
app.use('/api/carts', cartRoutes);   // Rutas de carrito
app.use('/api/tickets', ticketRoutes);  // Rutas de tickets

// Rutas para las vistas
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
