import express from 'express';
import Controllers from '../controllers/Controllers.js';

const router = express.Router();

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


