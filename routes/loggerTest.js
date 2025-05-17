const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

router.get('/loggerTest', (req, res) => {
  logger.debug('🔍 Debug log');
  logger.http('🌐 HTTP log');
  logger.info('ℹ️ Info log');
  logger.warn('⚠️ Warning log');      // <- CAMBIO AQUÍ
  logger.error('❌ Error log');
  // logger.fatal('💀 Fatal log'); // Esto también da error si no definiste el nivel 'fatal'

  res.json({
    status: 'success',
    message: 'Logger test ejecutado correctamente.'
  });
});

module.exports = router;