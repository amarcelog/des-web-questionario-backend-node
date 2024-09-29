import express from 'express';
import Controllers from '../controllers/Controllers.js';
const rotas = express.Router();
const controllers = new Controllers();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Data de exclusão lógica
 *     Pergunta:
 *       type: object
 *       required:
 *         - descricao
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da pergunta
 *         descricao:
 *           type: string
 *           description: Descrição da pergunta
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Data de exclusão lógica
 *     PerguntaOpcao:
 *       type: object
 *       required:
 *         - id_pergunta
 *         - descricao
 *         - pontos
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da opção
 *         id_pergunta:
 *           type: integer
 *           description: ID da pergunta relacionada
 *         descricao:
 *           type: string
 *           description: Descrição da opção
 *         pontos:
 *           type: integer
 *           description: Pontos da opção
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Data de exclusão lógica
 *     QuestRespondid:
 *       type: object
 *       required:
 *         - id_usuario
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do questionário respondido
 *         id_usuario:
 *           type: integer
 *           description: ID do usuário que está respondendo
 *         datahorainicio:
 *           type: string
 *           format: date-time
 *           description: Data e hora de início do questionário
 *         datahorafim:
 *           type: string
 *           format: date-time
 *           description: Data e hora de fim do questionário
 *         pontuacao:
 *           type: integer
 *           description: Pontuação obtida no questionário
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Data de exclusão lógica
 *     Resposta:
 *       type: object
 *       required:
 *         - id_pergunta
 *         - id_opcao
 *         - id_quest
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da resposta
 *         id_pergunta:
 *           type: integer
 *           description: ID da pergunta respondida
 *         id_opcao:
 *           type: integer
 *           description: ID da opção escolhida
 *         id_quest:
 *           type: integer
 *           description: ID do questionário respondido
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Data de exclusão lógica
 */


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
rotas.post('/usuarios', controllers.criarUsuario.bind(controllers));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
rotas.get('/usuarios/:id', controllers.buscarUsuarioPorId.bind(controllers));

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
rotas.get('/usuarios', controllers.buscarTodosUsuarios.bind(controllers));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Atualiza e Soft Delete um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
rotas.patch('/usuarios/:id', controllers.atualizarUsuario.bind(controllers));

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Hard Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
rotas.delete('/usuarios/:id', controllers.deletarUsuario.bind(controllers));

/**
 * @swagger
 * tags:
 *   name: Perguntas
 *   description: Operações relacionadas a perguntas
 */

/**
 * @swagger
 * /api/perguntas:
 *   post:
 *     summary: Cria uma nova pergunta
 *     tags: [Perguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pergunta'
 *     responses:
 *       201:
 *         description: Pergunta criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
rotas.post('/perguntas', controllers.criarPergunta.bind(controllers));

/**
 * @swagger
 * /api/perguntas/{id}:
 *   get:
 *     summary: Busca uma pergunta pelo ID
 *     tags: [Perguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pergunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pergunta'
 *       404:
 *         description: Pergunta não encontrada
 */
rotas.get('/perguntas/:id', controllers.buscarPerguntaPorId.bind(controllers));

/**
 * @swagger
 * /api/perguntas:
 *   get:
 *     summary: Lista todas as perguntas
 *     tags: [Perguntas]
 *     responses:
 *       200:
 *         description: Lista de perguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pergunta'
 */
rotas.get('/perguntas', controllers.buscarTodasPerguntas.bind(controllers));

/**
 * @swagger
 * /api/perguntas/{id}:
 *   patch:
 *     summary: Atualiza e Soft Delete uma pergunta
 *     tags: [Perguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pergunta'
 *     responses:
 *       200:
 *         description: Pergunta atualizada com sucesso
 *       404:
 *         description: Pergunta não encontrada
 */
rotas.patch('/perguntas/:id', controllers.atualizarPergunta.bind(controllers));

/**
 * @swagger
 * /api/perguntas/{id}:
 *   delete:
 *     summary: Hard Deleta uma pergunta
 *     tags: [Perguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pergunta deletada com sucesso
 *       404:
 *         description: Pergunta não encontrada
 */
rotas.delete('/perguntas/:id', controllers.deletarPergunta.bind(controllers));

/**
 * @swagger
 * tags:
 *   name: Opções
 *   description: Operações relacionadas a opções de perguntas
 */

/**
 * @swagger
 * /api/opcoes:
 *   post:
 *     summary: Cria uma nova opção
 *     tags: [Opções]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Opcao'
 *     responses:
 *       201:
 *         description: Opção criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
rotas.post('/opcoes', controllers.criarOpcao.bind(controllers));

/**
 * @swagger
 * /api/opcoes/{id}:
 *   get:
 *     summary: Busca uma opção pelo ID
 *     tags: [Opções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opção encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opcao'
 *       404:
 *         description: Opção não encontrada
 */
rotas.get('/opcoes/:id', controllers.buscarOpcaoPorId.bind(controllers));

/**
 * @swagger
 * /api/opcoes:
 *   get:
 *     summary: Lista todas as opções
 *     tags: [Opções]
 *     responses:
 *       200:
 *         description: Lista de opções
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Opcao'
 */
rotas.get('/opcoes', controllers.buscarTodasOpcoes.bind(controllers));

/**
 * @swagger
 * /api/opcoes/{id}:
 *   patch:
 *     summary: Atualiza e Soft Delete uma opção
 *     tags: [Opções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Opcao'
 *     responses:
 *       200:
 *         description: Opção atualizada com sucesso
 *       404:
 *         description: Opção não encontrada
 */
rotas.patch('/opcoes/:id', controllers.atualizarOpcao.bind(controllers));

/**
 * @swagger
 * /api/opcoes/{id}:
 *   delete:
 *     summary: Hard Deleta uma opção
 *     tags: [Opções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opção deletada com sucesso
 *       404:
 *         description: Opção não encontrada
 */
rotas.delete('/opcoes/:id', controllers.deletarOpcao.bind(controllers));

/**
 * @swagger
 * tags:
 *   name: Questionários
 *   description: Operações relacionadas a questionários respondidos
 */

/**
 * @swagger
 * /api/questionarios:
 *   post:
 *     summary: Cria um novo questionário respondido
 *     tags: [Questionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Questionario'
 *     responses:
 *       201:
 *         description: Questionário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
rotas.post('/questionarios', controllers.criarQuestRespondida.bind(controllers));

/**
 * @swagger
 * /api/questionarios/{id}:
 *   get:
 *     summary: Busca um questionário pelo ID
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questionário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questionario'
 *       404:
 *         description: Questionário não encontrado
 */
rotas.get('/questionarios/:id', controllers.buscarQuestRespondidaPorId.bind(controllers));

/**
 * @swagger
 * /api/questionarios:
 *   get:
 *     summary: Lista todos os questionários
 *     tags: [Questionários]
 *     responses:
 *       200:
 *         description: Lista de questionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Questionario'
 */
rotas.get('/questionarios', controllers.buscarTodosQuestRespondidas.bind(controllers)); // Use o método adequado

/**
 * @swagger
 * /api/questionarios/{id}:
 *   patch:
 *     summary: Atualiza um questionário
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Questionario'
 *     responses:
 *       200:
 *         description: Questionário atualizado com sucesso
 *       404:
 *         description: Questionário não encontrado
 */
rotas.patch('/questionarios/:id', controllers.atualizarQuestionario.bind(controllers));


/**
 * @swagger
 * /api/questionarios/{id}/finalizar:
 *   patch:
 *     summary: Finaliza um questionário
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questionário finalizado com sucesso
 *       404:
 *         description: Questionário não encontrado
 */
rotas.patch('/questionarios/:id/finalizar', controllers.finalizarQuestionario.bind(controllers));

/**
 * @swagger
 * /api/questionarios/{id}:
 *   delete:
 *     summary: Hard Deleta um questionário
 *     tags: [Questionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Questionário deletado com sucesso
 *       404:
 *         description: Questionário não encontrado
 */
rotas.delete('/questionarios/:id', controllers.deletarQuestRespondida.bind(controllers));

/**
 * @swagger
 * tags:
 *   name: Respostas
 *   description: Operações relacionadas a respostas
 */

/**
 * @swagger
 * /api/respostas:
 *   post:
 *     summary: Cria uma nova resposta
 *     tags: [Respostas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resposta'
 *     responses:
 *       201:
 *         description: Resposta criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
rotas.post('/respostas', controllers.criarResposta.bind(controllers));

/**
 * @swagger
 * /api/respostas/{id}:
 *   get:
 *     summary: Busca uma resposta pelo ID
 *     tags: [Respostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resposta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resposta'
 *       404:
 *         description: Resposta não encontrada
 */
rotas.get('/respostas/:id', controllers.buscarRespostaPorId.bind(controllers));

/**
 * @swagger
 * /api/respostas:
 *   get:
 *     summary: Lista todas as respostas
 *     tags: [Respostas]
 *     responses:
 *       200:
 *         description: Lista de respostas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resposta'
 */
rotas.get('/respostas', controllers.buscarTodasRespostas.bind(controllers));

/**
 * @swagger
 * /api/respostas/{id}:
 *   patch:
 *     summary: Atualiza uma resposta
 *     tags: [Respostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resposta'
 *     responses:
 *       200:
 *         description: Resposta atualizada com sucesso
 *       404:
 *         description: Resposta não encontrada
 */
rotas.patch('/respostas/:id', controllers.atualizarResposta.bind(controllers));

/**
 * @swagger
 * /api/respostas/{id}:
 *   delete:
 *     summary: Soft Deleta uma resposta
 *     tags: [Respostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resposta deletada com sucesso
 *       404:
 *         description: Resposta não encontrada
 */
rotas.delete('/respostas/:id', controllers.deletarResposta.bind(controllers));

export default rotas;


