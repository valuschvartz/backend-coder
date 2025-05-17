const { createLogger, format, transports } = require('winston');
const path = require('path');

const devLogger = createLogger({
  level: 'debug', // muestra todos los niveles
  format: format.combine(
    format.colorize(),
    format.simple()
  ),
  transports: [new transports.Console()],
});

const prodLogger = createLogger({
  level: 'info', // solo info, warning, error, fatal
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '..', 'logs', 'errors.log'),
      level: 'error'
    })
  ]
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

module.exports = logger;