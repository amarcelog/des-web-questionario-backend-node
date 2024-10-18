import Repositorio from '../repositorios/questionarioRepositorio.js';
import { QuestionarioValidacoes } from '../validadores/questionarioValidacoes.js';


class QuestionarioController {
  constructor() {
    this.repositorio = new Repositorio();
    this.validacoes = new QuestionarioValidacoes(this.repositorio);
    console.log('Repositorio criado:', this.repositorio);
  }
   // Métodos para questões respondidas
   criarQuestRespondida = async (req, res) => {
    try {
      const { id_usuario } = req.body;
  
      const erros = await this.validacoes.validarQuestRespondida(id_usuario);
  
      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }
  
      const id = await this.repositorio.criarQuestRespondida(id_usuario);
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

}

export default new QuestionarioController();




  