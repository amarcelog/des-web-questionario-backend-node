import Repositorio from '../repositorios/Repositorio.js';
import { Validacoes } from '../validadores/Validacoes.js';

class Controllers {
  async criarUsuario(req, res) {
    try {
      const repositorio = new Repositorio();
      const id = await repositorio.criarUsuario(req.body.nome, req.body.email);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }

  async buscarUsuarioPorId(req, res) {
    try {
      const repositorio = new Repositorio();
      const usuario = await repositorio.buscarUsuarioPorId(req.params.id);
      if (!usuario) {
        res.status(404).json({ erro: 'Usuário não encontrado' });
      } else {
        res.json(usuario);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  }

  async buscarTodosUsuarios(req, res) {
    try {
      const repositorio = new Repositorio();
      const usuarios = await repositorio.buscarTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todos os usuários' });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const repositorio = new Repositorio();
      const id = req.params.id;
      const usuarioExistente = await repositorio.buscarUsuarioPorId(id); // Busca o usuário existente
  
      if (!usuarioExistente) {
        res.status(404).json({ mensagem: "Usuário não encontrado." });
        return;
      }
  
      // Atualiza somente os campos enviados na requisição
      const nome = req.body.nome ?? usuarioExistente.nome;
      const email = req.body.email ?? usuarioExistente.email;
  
      await repositorio.atualizarUsuario(id, nome, email);
      res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  }
  

  async deletarUsuario(req, res) {
    try {
      const repositorio = new Repositorio();
      await repositorio.deletarUsuario(req.params.id);
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
  }

  // métodos para perguntas

  async criarPergunta(req, res) {
    try {
      const repositorio = new Repositorio();
      const id = await repositorio.criarPergunta(req.body.descricao);
      res.status(201).json({ id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar pergunta' });
    }
  }

  async buscarPerguntaPorId(req, res) {
    try {
      const repositorio = new Repositorio();
      const pergunta = await repositorio.buscarPerguntaPorId(req.params.id);
      if (!pergunta) {
        res.status(404).json({ erro: 'Pergunta não encontrada' });
      } else {
        res.json(pergunta);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar pergunta' });
    }
  }

  async buscarTodasPerguntas(req, res) {
    try {
      const repositorio = new Repositorio();
      const perguntas = await repositorio.buscarTodasPerguntas();
      res.json(perguntas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as perguntas' });
    }
  }

  async atualizarPergunta(req, res) {
    try {
      const repositorio = new Repositorio();
      await repositorio.atualizarPergunta(req.params.id, req.body.descricao);
      res.status(200).json({ mensagem: 'Pergunta atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar pergunta' });
    }
  }

  async deletarPergunta(req, res) {
    try {
      const repositorio = new Repositorio();
      await repositorio.deletarPergunta(req.params.id);
      res.status(200).json({ mensagem: 'Pergunta deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar pergunta' });
    }
  }

// métodos para opções

async criarOpcao(req, res) {
  try {
    const repositorio = new Repositorio();
    const id = await repositorio.criarOpcao(req.body.id_pergunta, req.body.descricao, req.body.pontos);
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar opção' });
  }
}

async buscarOpcaoPorId(req, res) {
  try {
    const repositorio = new Repositorio();
    const opcao = await repositorio.buscarOpcaoPorId(req.params.id);
    if (!opcao) {
      res.status(404).json({ erro: 'Opção não encontrada' });
    } else {
      res.json(opcao);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar opção' });
  }
}

async buscarTodasOpcoes(req, res) {
  try {
    const repositorio = new Repositorio();
    const opcoes = await repositorio.buscarTodasOpcoes();
    res.json(opcoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar todas as opções' });
  }
}

async atualizarOpcao(req, res) {
  try {
    const repositorio = new Repositorio();
    const id = req.params.id;

    // Busca a opção existente pelo ID
    const opcaoExistente = await repositorio.buscarOpcaoPorId(id);

    if (opcaoExistente.length === 0) { 
      res.status(404).json({ mensagem: "Nenhuma opção encontrada." });
      return;
    }
    const [opcao] = opcaoExistente; // Desestruture o array

    // Verifica o tipo de dados do corpo da requisição
    const body = Array.isArray(req.body) ? req.body[0] : req.body; 

    // Atualiza somente os campos enviados no corpo da requisição
    opcao.descricao = body.descricao ?? opcao.descricao;
    opcao.pontos = body.pontos ?? opcao.pontos;

    // Repassa a atualização para o repositório
    await repositorio.atualizarOpcao(id, opcao);

    // Retorna a opção atualizada
    res.json(opcao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar a opção.' });
  }
}



async deletarOpcao(req, res) {
  try {
    const repositorio = new Repositorio();
    await repositorio.deletarOpcao(req.params.id);
    res.status(200).json({ mensagem: 'Opção deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao deletar opção' });
  }
}
  
    // métodos para questões respondidas
  
async criarQuestRespondida(req, res) {
  try {
    const { id_usuario } = req.body;

    const validacoes = new Validacoes(new Repositorio());
    const erros = await validacoes.validarQuestRespondida(id_usuario);

    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const repositorio = new Repositorio();
    const id = await repositorio.criarQuestRespondida(id_usuario);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Erro ao criar questão respondida:', error);
    res.status(500).json({ erro: 'Erro ao criar questão respondida' });
  }
}
    
    
  
    async buscarQuestRespondidaPorId(req, res) {
      try {
        const repositorio = new Repositorio();
        const questRespondida = await repositorio.buscarQuestRespondidaPorId(req.params.id);
        if (!questRespondida) {
          res.status(404).json({ erro: 'Questão respondida não encontrada' });
        } else {
          res.json(questRespondida);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar questão respondida' });
      }
    }
    
    async buscarTodosQuestRespondidas(req, res) {
      try {
        const repositorio = new Repositorio();
        const questRespondidas = await repositorio.buscarTodosQuestRespondidas();
        res.json(questRespondidas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar todas as questões respondidas' });
      }
    }

    // ... outros métodos do controller ...

  async atualizarQuestionario(req, res) {
    try {
      const repositorio = new Repositorio();
      const id = req.params.id;
      const questionarioExistente = await repositorio.buscarQuestRespondidaPorId(id);

      if (!questionarioExistente) {
        res.status(404).json({ mensagem: "Questionário não encontrado." });
        return;
      }

      // Atualiza somente os campos enviados na requisição
      // (Verifique quais campos você permite atualizar)
      questionarioExistente.id_usuario = req.body.id_usuario ?? questionarioExistente.id_usuario;
      // ... outros campos a serem atualizados ...

      await repositorio.atualizarQuestionario(id, questionarioExistente);
      res.status(200).json({ mensagem: 'Questionário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar questionário' });
    }
  }
  
    async finalizarQuestionario(req, res) {
      try {
        const repositorio = new Repositorio();
        await repositorio.finalizarQuestionario(req.params.id);
        res.status(200).json({ mensagem: 'Questionário finalizado com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao finalizar questionário' });
      }
    }
  
    async deletarQuestRespondida(req, res) {
      try {
        const repositorio = new Repositorio();
        await repositorio.deletarQuestRespondida(req.params.id);
        res.status(200).json({ mensagem: 'Questão respondida deletada com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar questão respondida' });
      }
    }

    // Métodos para respostas

    async criarResposta(req, res) {
      try {
        const repositorio = new Repositorio();
        const id = await repositorio.criarResposta(req.body.id_quest, req.body.id_opcao);
        res.status(201).json({ id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar resposta' });
      }
    }
  
    async buscarRespostaPorId(req, res) {
      try {
        const repositorio = new Repositorio();
        const resposta = await repositorio.buscarRespostaPorId(req.params.id);
        if (!resposta) {
          res.status(404).json({ erro: 'Resposta não encontrada' });
        } else {
          res.json(resposta);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar resposta' });
      }
    }
  
    async buscarTodasRespostas(req, res) {
      try {
        const repositorio = new Repositorio();
        const respostas = await repositorio.buscarTodasRespostas();
        res.json(respostas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar todas as respostas' });
      }
    }
  
    async atualizarResposta(req, res) {
      try {
        const repositorio = new Repositorio();
        await repositorio.atualizarResposta(req.params.id, req.body.id_opcao);
        res.status(200).json({ mensagem: 'Resposta atualizada com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar resposta' });
      }
    }
  
    async deletarResposta(req, res) {
      try {
        const repositorio = new Repositorio();
        await repositorio.deletarResposta(req.params.id);
        res.status(200).json({ mensagem: 'Resposta deletada com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar resposta' });
      }
    }
}
  
  export default Controllers;


  