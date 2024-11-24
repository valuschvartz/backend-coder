const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');  // Asegúrate de que Passport esté importado
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');
const productRoutes = require('./routes/products');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Inicializar Passport
require('./config/passport')(passport);  // Aquí inicializamos la estrategia de Passport

// Usar los middlewares
app.use(express.json());
app.use(passport.initialize());  // Inicializa Passport para todas las rutas

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tickets', ticketRoutes);


// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
