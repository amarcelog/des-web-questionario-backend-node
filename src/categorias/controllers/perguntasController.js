import PerguntasRepositorio from "../repositorios/perguntasRepositorio.js";
import { PerguntasValidacoes } from "../validadores/perguntasValidacoes.js";

class PerguntasController {
  constructor() {
    this.repositorio = new PerguntasRepositorio();
    this.validacoes = new PerguntasValidacoes(this.repositorio);
    console.log("Repositorio criado:", this.repositorio);
  }
  // Métodos para perguntas
  criarPergunta = async (req, res) => {
    try {
      const { descricao } = req.body;

      // Validação da pergunta
      const errosValidacao = await this.validacoes.validarPergunta(
        descricao
      );

      if (Object.keys(errosValidacao).length > 0) {
        return res.status(400).json({ erros: errosValidacao });
      }

      // Busca todas as perguntas existentes
      const perguntasExistentes = await this.repositorio.buscarTodasPerguntas();

      // Verifica se já existe uma descrição igual

      for (const pergunta of perguntasExistentes) {
        if (pergunta.descricao === descricao) {
          return res.status(400).json({
            erro: `Descrição já existe com o ID ${pergunta.id}`,
          });
        }
      }

      // Criação da nova pergunta

      const id = await this.repositorio.criarPergunta(descricao);

      res.status(201).json({ id });
    } catch (error) {
      console.error(error);

      res.status(500).json({ erro: "Erro ao criar pergunta" });
    }
  };

  buscarPerguntaPorId = async (req, res) => {
    try {
      const pergunta = await this.repositorio.buscarPerguntaPorId(
        req.params.id
      );
      if (!pergunta) {
        res.status(404).json({ erro: "Pergunta não encontrada" });
      } else {
        res.json(pergunta);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar pergunta" });
    }
  };

  buscarTodasPerguntas = async (req, res) => {
    try {
      const perguntas = await this.repositorio.buscarTodasPerguntas();
      res.json(perguntas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar todas as perguntas" });
    }
  };

  atualizarPergunta = async (req, res) => {
    try {
      const erros = await this.validacoes.validarPergunta(req.body.descricao);

      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }

      await this.repositorio.atualizarPergunta(
        req.params.id,
        req.body.descricao
      );
      res.status(200).json({ mensagem: "Pergunta atualizada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar pergunta" });
    }
  };

  deletarPergunta = async (req, res) => {
    try {
      await this.repositorio.deletarPergunta(req.params.id);
      res.status(200).json({ mensagem: "Pergunta deletada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar pergunta" });
    }
  };
}

export default new PerguntasController();
