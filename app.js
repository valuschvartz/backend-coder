const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts'); // Asegúrate de importar las rutas correctamente
const productRoutes = require('./routes/products');

const app = express();

// Configurar middlewares
app.use(express.json());  // Middleware para procesar cuerpo de las solicitudes en formato JSON
app.use(passport.initialize());  // Inicializa Passport
require('./config/passport')(passport);  // Configura Passport

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);  // Asegúrate de que esta ruta esté registrada
app.use('/api/products', productRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
