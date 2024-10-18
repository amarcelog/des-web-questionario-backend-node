import RespostasRepositorio from "../repositorios/respostasRepositorio.js";
import { RespostasValidacoes } from "../validadores/RespostasValidacoes.js";

class RespostasController {
  constructor() {
    this.repositorio = new RespostasRepositorio();
    this.validacoes = new RespostasValidacoes(this.repositorio);
    console.log('Repositorio criado:', this.repositorio);
  }
 
  // Métodos para respostas
  criarResposta = async (req, res) => {
    try {
      console.log('Corpo da requisição:', req.body);
      const { id_pergunta, id_opcao, id_quest } = req.body;
      console.log('Valores extraídos:', { id_pergunta, id_opcao, id_quest });
  
      const erros = await this.validacoes.validarResposta(id_pergunta, id_opcao, id_quest);
  
      if (Object.keys(erros).length > 0) {
        console.log('Erros de validação:', erros);
        return res.status(400).json({ erros });
      }
  
      const id = await this.repositorio.criarResposta(id_quest, id_opcao);
      res.status(201).json({ id });
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
      res.status(500).json({ erro: 'Erro ao criar resposta', detalhes: error.message });
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

export default new RespostasController();