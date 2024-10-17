import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';

const usuariosrouter = express.Router();

// Rotas para usuários
usuariosrouter.post('/criarusuarios', UsuariosController.criarUsuario);
usuariosrouter.get('/usuariosid/:id', UsuariosController.buscarUsuarioPorId);
usuariosrouter.get('/usuariosinativos', UsuariosController.buscarUsuariosInativos);
usuariosrouter.get('/usuariosativos', UsuariosController.buscarUsuariosAtivos);
usuariosrouter.get('/todosusuarios', UsuariosController.buscarTodosUsuarios);
usuariosrouter.patch('/atualizarusuarios/:id', UsuariosController.atualizarUsuario);
usuariosrouter.delete('/apagarusuarios/:id', UsuariosController.deletarUsuario);

export default usuariosrouter;