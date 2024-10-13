import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import { swaggerDefinitions } from './src/swaggerDefinitions.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Questionário',
      version: '1.0.0',
      description: 'Documentação da API do Questionário',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/**/*.js', './categorias/rotas/*.js'], // Incluindo tanto src quanto categorias/rotas
};

const swaggerSpec = swaggerJsdoc(options);

// Mesclar as definições do swaggerDefinitions.js
swaggerSpec.components = { ...swaggerSpec.components, ...swaggerDefinitions.components };

// Mesclar as rotas do swaggerDefinitions.js com as rotas capturadas automaticamente
swaggerSpec.paths = { ...swaggerSpec.paths, ...swaggerDefinitions.paths };

// Salve o arquivo swagger.json
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));

console.log('Arquivo swagger.json gerado com sucesso!');