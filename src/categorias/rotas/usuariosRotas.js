import express from 'express';
import UsuariosControllers from '../controllers/usuariosController.js';

const usuariosrouter = express.Router();

// Rotas para usuários
usuariosrouter.post('/criarusuarios', UsuariosControllers.criarUsuario);
usuariosrouter.get('/usuariosid/:id', UsuariosControllers.buscarUsuarioPorId);
usuariosrouter.get('/usuariosinativos', UsuariosControllers.buscarUsuariosInativos);
usuariosrouter.get('/usuariosativos', UsuariosControllers.buscarUsuariosAtivos);
usuariosrouter.get('/todosusuarios', UsuariosControllers.buscarTodosUsuarios);
usuariosrouter.patch('/atualizarusuarios/:id', UsuariosControllers.atualizarUsuario);
usuariosrouter.delete('/apagarusuarios/:id', UsuariosControllers.deletarUsuario);

export default usuariosrouter;