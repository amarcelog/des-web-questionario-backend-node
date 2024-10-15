import express from 'express';
import perguntasController from '../controllers/perguntasController.js';

const perguntasrouter = express.Router();

// Rotas para perguntas
perguntasrouter.post('/perguntas', perguntasController.criarPergunta);
perguntasrouter.get('/perguntas/:id', perguntasController.buscarPerguntaPorId);
perguntasrouter.get('/perguntas', perguntasController.buscarTodasPerguntas);
perguntasrouter.patch('/perguntas/:id', perguntasController.atualizarPergunta);
perguntasrouter.delete('/perguntas/:id', perguntasController.deletarPergunta);

export default perguntasrouter;