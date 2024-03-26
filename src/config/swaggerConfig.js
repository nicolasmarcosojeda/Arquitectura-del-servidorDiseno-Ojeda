import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Opciones de configuración para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos y Carrito',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar productos y carrito de compras',
    },
  },
  apis: ['./controllers/*.js'], // Ruta donde se encuentran los controladores que contienen la documentación JSDoc
};

// Genera el documento Swagger
const swaggerSpec = swaggerJsdoc(options);

// Middleware para servir la documentación Swagger UI
const serveSwaggerUI = swaggerUi.setup(swaggerSpec);

export { swaggerSpec, serveSwaggerUI };