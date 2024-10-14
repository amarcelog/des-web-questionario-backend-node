import express from "express";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import router from "./categorias/rotas/Rotas.js";
import cors from 'cors';
import usuariosrouter from "./categorias/rotas/usuariosRotas.js";

async function run() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Lê o arquivo swagger.json
  const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

  // Configuração do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Redireciona para a documentação Swagger
  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

  // Usar as rotas definidas em Rotas.js
  app.use('/api', router, usuariosrouter);

  // ... (resto do seu código)

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


