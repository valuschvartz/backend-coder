const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');
const loggerTestRouter = require('./routes/loggerTest');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

logger.info(`🌱 Entorno: ${process.env.NODE_ENV || 'development'}`);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', loggerTestRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/errorTest', (req, res, next) => {
    const error = new Error('Error de prueba');
    error.code = 'USER_NOT_FOUND';  // Por ejemplo, un código definido en errorDictionary
    next(error);
  });



// MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => logger.info('✅ Conexión exitosa a MongoDB'))
  .catch((err) => logger.error('❌ Error al conectar a MongoDB:', err));

// Middleware de errores
app.use(errorHandler);

// Servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en el puerto ${PORT}`);
});