import UsuariosRepositorio from "../repositorios/usuariosRepositorio.js";
import { UsuariosValidacoes } from "../validadores/usuariosValidacoes.js";

class UsuariosController {
  constructor() {
    this.repositorio = new UsuariosRepositorio();
    this.validacoes = new UsuariosValidacoes(this.repositorio);
    console.log("Repositorio de usuário criado:", this.repositorio);
  }

 // C - Create
 criarUsuario = async (req, res) => {
    try {
      const { nome, email } = req.body;
  
      // Validação do nome e email
      const resultado = await this.validacoes.validarCriacaoUsuario(nome, email);
  
      // Verifica se houve erros de validação
      if (resultado.errors) {
        return res.status(400).json({ erros: resultado.errors });
      }
  
      // Passa nome e email separadamente para o repositório
      const novoUsuario = await this.repositorio.criarUsuario(nome, email);
      return res.status(201).json({ id: novoUsuario });
    } catch (error) {
      console.error(error);
  
      // Verifica se o erro é sobre usuário existente
      if (error.code === 409) {
        return res.status(409).json({ erro: error.message });
      }
  
      // Para outros erros, retorna um erro genérico
      return res.status(500).json({ erro: "Erro ao criar usuário" });
    }
  };
  

  
  
  // R - Read 1/4 - Por ID ALL
  buscarUsuarioPorId = async (req, res) => {
    try {
      const usuario = await this.repositorio.buscarUsuarioPorId(req.params.id);
      if (!usuario.length) {
        res.status(404).json({ erro: "Usuário não encontrado com esse ID" });
      } else {
        res.json(usuario[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar usuário por ID" });
    }
  };

  // R - Read 2/4- Inativos
  buscarUsuariosInativos = async (req, res) => {
    try {
      const usuarios = await this.repositorio.buscarUsuariosInativos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar os usuários inativos" });
    }
  };

  // R - Read 3/4- Ativos
  buscarUsuariosAtivos = async (req, res) => {
    try {
      const usuarios = await this.repositorio.buscarUsuariosAtivos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar os usuários Ativos" });
    }
  };

  // R - Read 4/4- ALL
  buscarTodosUsuarios = async (req, res) => {
    try {
      const usuarios = await this.repositorio.buscarTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar todos os usuários" });
    }
  };

  // Função de seta para preservar o contexto "this"
  atualizarUsuario = async (req, res) => {
    try {
      const id = req.params.id;
      console.log("ID recebido:", id);
  
      // Busca o usuário atual no banco de dados
      const usuarios = await this.repositorio.buscarUsuarioPorId(id);
      console.log("Resultado da busca:", usuarios);
  
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
  
      const [usuario] = usuarios;
      console.log("Usuário antes da atualização:", usuario);
  
      // Verificação adicional para apresentar erro caso o usuário existente esteja inativo
      if (usuario.deleted_at !== null) {
        return res.status(400).json({
          erro: "Usuário já existente inativo, ative antes de atualizar",
        });
      }
  
      const body = Array.isArray(req.body) ? req.body[0] : req.body;
      console.log("Body recebido:", body);
  
      // Tentativa de atualização
      const usuarioAtualizado = { ...usuario };
      if (body.nome !== undefined) {
        usuarioAtualizado.nome = body.nome;
        console.log("Nome atualizado para:", body.nome);
      }
      if (body.email !== undefined) {
        usuarioAtualizado.email = body.email;
        console.log("Email atualizado para:", body.email);
      }
  
      console.log("Usuário após tentativa de atualização:", usuarioAtualizado);
  
      // Valida apenas os campos que estão sendo atualizados
      const camposParaValidar = {};
      if (body.nome !== undefined)
        camposParaValidar.nome = usuarioAtualizado.nome;
      if (body.email !== undefined)
        camposParaValidar.email = usuarioAtualizado.email;
  
      const { errors } =
        this.validacoes.validarAtualizacaoUsuario(camposParaValidar);
  
      if (errors && Object.keys(errors).length > 0) {
        console.log("Erros de validação:", errors);
        return res.status(400).json({ erros: errors });
      }
  
      // Atualiza o usuário no repositório
      console.log(
        "Enviando para atualização no repositório:",
        usuarioAtualizado
      );
      await this.repositorio.atualizarUsuario(id, usuarioAtualizado);
  
      console.log(
        "Usuário após atualização no repositório:",
        usuarioAtualizado
      );
      res.json(usuarioAtualizado);
    } catch (error) {
      console.error("Erro durante a atualização:", error);
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  };
  

  deletarUsuario = async (req, res) => {
    try {
      await this.repositorio.deletarUsuario(req.params.id);
      res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
  };
}

export default new UsuariosController();
