import express from 'express';
import OpcoesController from '../controllers/opcoesController.js';

const opcoesrouter = express.Router();

// Rotas para opções
opcoesrouter.post('/opcoes', OpcoesController.criarOpcao);
opcoesrouter.get('/opcoes/:id', OpcoesController.buscarOpcaoPorId);
opcoesrouter.get('/opcoes', OpcoesController.buscarTodasOpcoes);
opcoesrouter.patch('/opcoes/:id', OpcoesController.atualizarOpcao);
opcoesrouter.delete('/opcoes/:id', OpcoesController.deletarOpcao);

export default opcoesrouter;