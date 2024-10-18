import express from 'express';
import RespostaController from '../controllers/respostaController.js';

const respostasrouter = express.Router();

// Rotas para questionários respondidos
respostasrouter.post('/respostas', RespostaController.criarResposta);
respostasrouter.get('/respostas/:id', RespostaController.buscarRespostaPorId);
respostasrouter.get('/respostas', RespostaController.buscarTodasRespostas);
respostasrouter.patch('/respostas/:id', RespostaController.atualizarResposta);
respostasrouter.delete('/respostas/:id', RespostaController.deletarResposta);

export default respostasrouter;