import express from 'express';
import QuestionarioController from '../controllers/questionarioController.js';

const questionariorouter = express.Router();

// Rotas para questionários respondidos
questionariorouter.post('/quest_respondidas', QuestionarioController.criarQuestionarioRespondido);
questionariorouter.get('/quest_respondidas/:id', QuestionarioController.buscarQuestRespondidaPorId);
questionariorouter.get('/quest_respondidas', QuestionarioController.buscarTodosQuestRespondidas);
questionariorouter.patch('/quest_respondidas/:id', QuestionarioController.criarQuestionarioRespondido);
questionariorouter.delete('/quest_respondidas/:id', QuestionarioController.criarQuestionarioRespondido);
questionariorouter.put('/quest_respondidas/:id/finalizar', QuestionarioController.criarQuestionarioRespondido);

export default questionariorouter;


