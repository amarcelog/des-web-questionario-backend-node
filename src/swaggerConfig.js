// swaggerConfig.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Questionário',
      version: '1.0.0',
      description: 'Uma API para gerenciar questionários, usuários, perguntas e respostas',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de Desenvolvimento'
      },
    ],
    components: {},
    explorer: true
  },

  
  apis: [path.join(__dirname, './categorias/rotas/Rotas.js')],
};

export default swaggerOptions;

