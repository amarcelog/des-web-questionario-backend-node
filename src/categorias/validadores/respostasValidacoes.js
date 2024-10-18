import OpcoesRepositorio from "../repositorios/opcoesRepositorio.js";
import QuestRespondidosRepositorio from "../repositorios/questionarioRepositorio.js";
import PerguntasRepositorio from "../repositorios/perguntasRepositorio.js";

export class RespostasValidacoes {
  constructor(respostasRepositorio) {
    this.respostasRepositorio = respostasRepositorio;
    this.opcoesRepositorio = new OpcoesRepositorio();
    this.questionariosRespondidosRepositorio = new QuestRespondidosRepositorio();
    this.perguntasRepositorio = new PerguntasRepositorio();
  }

  async validarResposta(id_pergunta, id_opcao, id_quest) {
    const erros = {};

    if (!id_pergunta) {
      erros.id_pergunta = "ID da pergunta é obrigatório";
    }

    if (!id_opcao) {
      erros.id_opcao = "ID da opção é obrigatório";
    }

    if (!id_quest) {
      erros.id_quest = "ID do questionário respondido é obrigatório";
    }

    // Verifica se o questionário respondido existe
    if (id_quest) {
      const questionarioRespondido = await this.questionariosRespondidosRepositorio.buscarQuestRespondidaPorId(id_quest);
      if (!questionarioRespondido) {
        erros.id_quest = "Questionário respondido não encontrado";
        return erros;
      }
    } else {
      return erros;
    }

    // Verifica se a pergunta existe
    if (id_pergunta) {
      const pergunta = await this.perguntasRepositorio.buscarPerguntaPorId(id_pergunta);
      if (!pergunta) {
        erros.id_pergunta = "Pergunta não encontrada";
        return erros;
      }
    } else {
      return erros;
    }

    // Verifica se a opção existe e pertence à pergunta
    if (id_pergunta && id_opcao) {
      const opcao = await this.opcoesRepositorio.buscarOpcaoPorId(id_opcao);
      if (!opcao) {
        erros.id_opcao = "Opção não encontrada";
      } else if (opcao.id_pergunta !== id_pergunta) {
        erros.id_opcao = "Opção não pertence à pergunta especificada";
      }
    }

    // Verifica se já existe uma resposta para esta pergunta neste questionário
    if (id_pergunta && id_quest) {
      const respostasExistentes = await this.respostasRepositorio.buscarTodasRespostas();
      const respostaExistente = respostasExistentes.find(
        (r) => r.id_pergunta === id_pergunta && r.id_quest === id_quest
      );
      if (respostaExistente) {
        erros.resposta = "Já existe uma resposta para esta pergunta neste questionário";
      }
    }

    return erros;
  }
}


 



