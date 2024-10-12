import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../../swaggerConfig.js';
import controllers from '../controllers/Controllers.js'; // Importa a instância do Controllers

const router = express.Router();

// Rotas para usuários
router.post('/usuarios', controllers.criarUsuario);
router.get('/usuarios/:id', controllers.buscarUsuarioPorId);
router.get('/usuarios', controllers.buscarTodosUsuarios);
router.patch('/usuarios/:id', controllers.atualizarUsuario);
router.delete('/usuarios/:id', controllers.deletarUsuario);

// Rotas para perguntas
router.post('/perguntas', controllers.criarPergunta);
router.get('/perguntas/:id', controllers.buscarPerguntaPorId);
router.get('/perguntas', controllers.buscarTodasPerguntas);
router.patch('/perguntas/:id', controllers.atualizarPergunta);
router.delete('/perguntas/:id', controllers.deletarPergunta);

// Rotas para opções
router.post('/opcoes', controllers.criarOpcao);
router.get('/opcoes/:id', controllers.buscarOpcaoPorId);
router.get('/opcoes', controllers.buscarTodasOpcoes);
router.patch('/opcoes/:id', controllers.atualizarOpcao);
router.delete('/opcoes/:id', controllers.deletarOpcao);

// Rotas para questões respondidas
router.post('/quest_respondidas', controllers.criarQuestRespondida);
router.get('/quest_respondidas/:id', controllers.buscarQuestRespondidaPorId);
router.get('/quest_respondidas', controllers.buscarTodosQuestRespondidas);
router.patch('/quest_respondidas/:id', controllers.atualizarQuestionario);
router.delete('/quest_respondidas/:id', controllers.deletarQuestRespondida);
router.put('/quest_respondidas/:id/finalizar', controllers.finalizarQuestionario);

// Rotas para respostas
router.post('/respostas', controllers.criarResposta);
router.get('/respostas/:id', controllers.buscarRespostaPorId);
router.get('/respostas', controllers.buscarTodasRespostas);
router.patch('/respostas/:id', controllers.atualizarResposta);
router.delete('/respostas/:id', controllers.deletarResposta);

// Swagger
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

export default router;




