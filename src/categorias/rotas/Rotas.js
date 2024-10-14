import express from 'express';
import Controllers from '../controllers/Controllers.js';

const router = express.Router();

// Rotas para perguntas
router.post('/perguntas', Controllers.criarPergunta);
router.get('/perguntas/:id', Controllers.buscarPerguntaPorId);
router.get('/perguntas', Controllers.buscarTodasPerguntas);
router.patch('/perguntas/:id', Controllers.atualizarPergunta);
router.delete('/perguntas/:id', Controllers.deletarPergunta);

// Rotas para opções
router.post('/opcoes', Controllers.criarOpcao);
router.get('/opcoes/:id', Controllers.buscarOpcaoPorId);
router.get('/opcoes', Controllers.buscarTodasOpcoes);
router.patch('/opcoes/:id', Controllers.atualizarOpcao);
router.delete('/opcoes/:id', Controllers.deletarOpcao);

// Rotas para questionários respondidos
router.post('/quest_respondidas', Controllers.criarQuestionarioRespondido);
router.get('/quest_respondidas/:id', Controllers.buscarQuestRespondidaPorId);
router.get('/quest_respondidas', Controllers.buscarTodosQuestRespondidas);
router.patch('/quest_respondidas/:id', Controllers.criarQuestionarioRespondido);
router.delete('/quest_respondidas/:id', Controllers.criarQuestionarioRespondido);
router.put('/quest_respondidas/:id/finalizar', Controllers.criarQuestionarioRespondido);

// Rotas para respostas
router.post('/respostas', Controllers.criarResposta);
router.get('/respostas/:id', Controllers.buscarRespostaPorId);
router.get('/respostas', Controllers.buscarTodasRespostas);
router.patch('/respostas/:id', Controllers.atualizarResposta);
router.delete('/respostas/:id', Controllers.deletarResposta);

export default router;


