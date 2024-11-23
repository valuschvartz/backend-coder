// app.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const userRoutes = require('./routes/users'); // Ruta para usuarios
const cartRoutes = require('./routes/carts'); // Ruta para carritos
const ticketRoutes = require('./routes/tickets'); // Ruta para tickets
const passportConfig = require('./config/passport'); // Configuración de passport
const exphbs = require('express-handlebars');

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
mongoose.connect('mongodb://localhost:27017/ecommerce', {
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
