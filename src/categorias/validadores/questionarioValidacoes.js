import UsuariosRepositorio from "../repositorios/usuariosRepositorio.js";
import QuestionarioRepositorio from "../repositorios/questionarioRepositorio.js";

export class QuestionarioValidacoes {
  constructor(questionarioRepositorio) {
    this.questionarioRepositorio = questionarioRepositorio;
    this.usuariosRepositorio = new UsuariosRepositorio();
    this.questRespondidosRepositorio = new QuestionarioRepositorio();
  }

  async validarQuestRespondida(id_usuario) {
    const erros = {};

    if (!id_usuario) {
      erros.id_usuario = "ID do usuário é obrigatório";
    } else {
      // Verifica se o usuário existe
      const usuario = await this.usuariosRepositorio.buscarUsuarioPorId(id_usuario);
      if (!usuario) {
        erros.id_usuario = "Usuário não encontrado";
      } else {
        // Verifica se o usuário tem um questionário não finalizado
        const questRespondida = await this.questRespondidosRepositorio.buscarQuestRespondidaPorUsuarioNaoFinalizado(id_usuario);
        if (questRespondida) {
          erros.questRespondida = "Usuário já possui um questionário não finalizado";
        }
      }
    }

    return erros;
  }
}





