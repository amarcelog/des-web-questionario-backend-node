import express from "express";
import router from "./categorias/rotas/Rotas.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

async function run() {
  const app = express();

  // Configuração do Swagger
  const options = {
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
    },
    apis: ['./categorias/rotas/Rotas.js'], // caminho para o arquivo de rotas
  };

  const specs = swaggerJsdoc(options);

  // Middleware para permitir CORS
  app.use(cors());

  // Middleware para parsear JSON
  app.use(express.json());

  // Middleware para parsear dados de formulário
  app.use(express.urlencoded({ extended: true }));

  // Rota para a documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

  // Redireciona para a documentação Swagger
  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

  // Usar as rotas definidas em Rotas.js
  app.use('/api', router);

  // Middleware para lidar com rotas não encontradas
  app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
  });

  // Middleware para lidar com erros
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: "Erro interno do servidor", detalhes: err.message });
  });

  // Iniciar o servidor
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}

run().catch((erro) => {
  console.error("Falha ao iniciar o servidor:", erro);
  process.exit(1);
});


