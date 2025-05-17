const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación de la API de AdoptMe',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Usa path para asegurarte
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;