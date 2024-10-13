import Repositorio from '../repositorios/Repositorio.js';
import { Validacoes } from '../validadores/Validacoes.js';

class Controllers {
  constructor() {
    this.repositorio = new Repositorio();
    this.validacoes = new Validacoes(this.repositorio);
    console.log('Repositorio criado:', this.repositorio);
  }

// Função de seta para preservar o contexto "this"
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
    res.status(201).json({ id: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

  buscarUsuarioPorId = async (req, res) => {
    try {
      const usuario = await this.repositorio.buscarUsuarioPorId(req.params.id);
      if (!usuario.length) {
        res.status(404).json({ erro: 'Usuário não encontrado' });
      } else {
        res.json(usuario[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  };

  buscarTodosUsuarios = async (req, res) => {
    try {
      const usuarios = await this.repositorio.buscarTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todos os usuários' });
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
    if (body.nome !== undefined) camposParaValidar.nome = usuarioAtualizado.nome;
    if (body.email !== undefined) camposParaValidar.email = usuarioAtualizado.email;

    const { errors } = this.validacoes.validarAtualizacaoUsuario(camposParaValidar);
    
    if (errors && Object.keys(errors).length > 0) {
      console.log("Erros de validação:", errors);
      return res.status(400).json({ erros: errors });
    }

    // Atualiza o usuário no repositório
    console.log("Enviando para atualização no repositório:", usuarioAtualizado);
    await this.repositorio.atualizarUsuario(id, usuarioAtualizado);

    console.log("Usuário após atualização no repositório:", usuarioAtualizado);
    res.json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro durante a atualização:", error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

  deletarUsuario = async (req, res) => {
    try {
      await this.repositorio.deletarUsuario(req.params.id);
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
  };

  // Métodos para perguntas
  criarPergunta = async (req, res) => {
    try {
      const erros = await this.validacoes.validarPergunta(req.body.descricao);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      const id = await this.repositorio.criarPergunta(req.body.descricao);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar pergunta' });
    }
  };

  buscarPerguntaPorId = async (req, res) => {
    try {
      const pergunta = await this.repositorio.buscarPerguntaPorId(req.params.id);
      if (!pergunta) {
        res.status(404).json({ erro: 'Pergunta não encontrada' });
      } else {
        res.json(pergunta);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar pergunta' });
    }
  };

  buscarTodasPerguntas = async (req, res) => {
    try {
      const perguntas = await this.repositorio.buscarTodasPerguntas();
      res.json(perguntas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as perguntas' });
    }
  };

  atualizarPergunta = async (req, res) => {
    try {
      const erros = await this.validacoes.validarPergunta(req.body.descricao);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      await this.repositorio.atualizarPergunta(req.params.id, req.body.descricao);
      res.status(200).json({ mensagem: 'Pergunta atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar pergunta' });
    }
  };

  deletarPergunta = async (req, res) => {
    try {
      await this.repositorio.deletarPergunta(req.params.id);
      res.status(200).json({ mensagem: 'Pergunta deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar pergunta' });
    }
  };

  // Métodos para opções
  criarOpcao = async (req, res) => {
    try {
      const erros = await this.validacoes.validarPerguntaOpcao(req.body.id_pergunta, req.body.descricao, req.body.pontos);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      const id = await this.repositorio.criarOpcao(req.body.id_pergunta, req.body.descricao, req.body.pontos);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar opção' });
    }
  };

  buscarOpcaoPorId = async (req, res) => {
    try {
      const opcao = await this.repositorio.buscarOpcaoPorId(req.params.id);
      if (!opcao) {
        res.status(404).json({ erro: 'Opção não encontrada' });
      } else {
        res.json(opcao);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar opção' });
    }
  };

  buscarTodasOpcoes = async (req, res) => {
    try {
      const opcoes = await this.repositorio.buscarTodasOpcoes();
      res.json(opcoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as opções' });
    }
  };

  atualizarOpcao = async (req, res) => {
    try {
      const erros = await this.validacoes.validarPerguntaOpcao(req.params.id, req.body.descricao, req.body.pontos);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      await this.repositorio.atualizarOpcao(req.params.id, req.body);
      res.status(200).json({ mensagem: 'Opção atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar opção' });
    }
  };

  deletarOpcao = async (req, res) => {
    try {
      await this.repositorio.deletarOpcao(req.params.id);
      res.status(200).json({ mensagem: 'Opção deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar opção' });
    }
  };

  // Métodos para questões respondidas
  criarQuestRespondida = async (req, res) => {
    try {
      const erros = await this.validacoes.validarQuestRespondida(req.body.id_usuario);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      const id = await this.repositorio.criarQuestRespondida(req.body.id_usuario);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar questão respondida' });
    }
  };

  buscarQuestRespondidaPorId = async (req, res) => {
    try {
      const questRespondida = await this.repositorio.buscarQuestRespondidaPorId(req.params.id);
      if (!questRespondida) {
        res.status(404).json({ erro: 'Questão respondida não encontrada' });
      } else {
        res.json(questRespondida);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar questão respondida' });
    }
  };

  buscarTodosQuestRespondidas = async (req, res) => {
    try {
      const questRespondidas = await this.repositorio.buscarTodosQuestRespondidas();
      res.json(questRespondidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as questões respondidas' });
    }
  };

  atualizarQuestionario = async (req, res) => {
    try {
      const id = req.params.id;
      const questionarioExistente = await this.repositorio.buscarQuestRespondidaPorId(id);

      if (!questionarioExistente) {
        res.status(404).json({ mensagem: "Questionário não encontrado." });
        return;
      }

      await this.repositorio.atualizarQuestionario(id, questionarioExistente);
      res.status(200).json({ mensagem: 'Questionário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar questionário' });
    }
  };

  finalizarQuestionario = async (req, res) => {
    try {
      await this.repositorio.finalizarQuestionario(req.params.id);
      res.status(200).json({ mensagem: 'Questionário finalizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao finalizar questionário' });
    }
  };

  criarQuestionarioRespondido = async (req, res) => {
    try {
      await this.repositorio.deletarQuestRespondida(req.params.id);
      res.status(200).json({ mensagem: 'Questão respondida deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar questão respondida' });
    }
  };

  // Métodos para respostas
  criarResposta = async (req, res) => {
    try {
      const erros = await this.validacoes.validarResposta(req.body.id_pergunta, req.body.id_opcao, req.body.id_quest);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      const id = await this.repositorio.criarResposta(req.body.id_quest, req.body.id_opcao);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar resposta' });
    }
  };

  buscarRespostaPorId = async (req, res) => {
    try {
      const resposta = await this.repositorio.buscarRespostaPorId(req.params.id);
      if (!resposta) {
        res.status(404).json({ erro: 'Resposta não encontrada' });
      } else {
        res.json(resposta);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar resposta' });
    }
  };

  buscarTodasRespostas = async (req, res) => {
    try {
      const respostas = await this.repositorio.buscarTodasRespostas();
      res.json(respostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as respostas' });
    }
  };

  atualizarResposta = async (req, res) => {
    try {
      const erros = await this.validacoes.validarResposta(req.body.id_pergunta, req.body.id_opcao, req.body.id_quest);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      await this.repositorio.atualizarResposta(req.params.id, req.body.id_opcao);
      res.status(200).json({ mensagem: 'Resposta atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar resposta' });
    }
  };

  deletarResposta = async (req, res) => {
    try {
      await this.repositorio.deletarResposta(req.params.id);
      res.status(200).json({ mensagem: 'Resposta deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar resposta' });
    }
  };
}

export default new Controllers();




  