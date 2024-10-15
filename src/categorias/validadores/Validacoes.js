import * as Yup from 'yup';

export class Validacoes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  // Validações para Pergunta Opções
  async validarPerguntaOpcao(idPergunta, descricao, pontos) {
    const schema = Yup.object().shape({
      idPergunta: Yup.number().positive('ID da pergunta deve ser positivo').integer('ID da pergunta deve ser um número inteiro').required('ID da pergunta é obrigatório'),
      descricao: Yup.string().min(1, 'A descrição da opção deve ter no mínimo 1 caractere').required('Descrição é obrigatória'),
      pontos: Yup.number().integer('Os pontos devem ser um número inteiro').required('Pontos são obrigatórios')
    });

    try {
      await schema.validate({ idPergunta, descricao, pontos }, { abortEarly: false });

      // Verifica se a pergunta existe
      const perguntaExiste = await this.repositorio.buscarPerguntaPorId(idPergunta);
      if (!perguntaExiste) {
        return ['O id_pergunta fornecido não existe na tabela perguntas.'];
      }

      return [];
    } catch (error) {
      return error.errors;
    }
  }

async validarQuestRespondida(id_usuario, dataHoraInicio = null, dataHoraFim = null, pontuacao = null) {
  const schema = Yup.object().shape({
    id_usuario: Yup.number().positive('ID do usuário deve ser positivo').integer('ID do usuário deve ser um número inteiro').required('ID do usuário é obrigatório'),
    dataHoraInicio: Yup.date().nullable(),
    dataHoraFim: Yup.date().nullable().min(Yup.ref('dataHoraInicio'), 'A data e hora de fim não pode ser anterior à data e hora de início'),
    pontuacao: Yup.number().integer('A pontuação deve ser um número inteiro').nullable()
  });

  try {
    await schema.validate({ id_usuario, dataHoraInicio, dataHoraFim, pontuacao }, { abortEarly: false });

    // Verifica se o usuário existe
    const usuarioExiste = await this.repositorio.buscarUsuarioPorId(id_usuario);
    if (!usuarioExiste) {
      return ['O id_usuario fornecido não existe na tabela usuarios.'];
    }

    return [];
  } catch (error) {
    return error.errors || [];
  }
}
  // Validações para Respostas
  async validarResposta(idPergunta, idOpcao, idQuest) {
    const schema = Yup.object().shape({
      idPergunta: Yup.number().positive('ID da pergunta deve ser positivo').integer('ID da pergunta deve ser um número inteiro').required('ID da pergunta é obrigatório'),
      idOpcao: Yup.number().positive('ID da opção deve ser positivo').integer('ID da opção deve ser um número inteiro').required('ID da opção é obrigatório'),
      idQuest: Yup.number().positive('ID do questionário deve ser positivo').integer('ID do questionário deve ser um número inteiro').required('ID do questionário é obrigatório')
    });

    try {
      await schema.validate({ idPergunta, idOpcao, idQuest }, { abortEarly: false });

      const perguntaExiste = await this.repositorio.buscarPerguntaPorId(idPergunta);
      if (!perguntaExiste) {
        return ['O id_pergunta fornecido não existe na tabela perguntas.'];
      }

      const opcaoExiste = await this.repositorio.buscarOpcaoPorId(idOpcao);
      if (!opcaoExiste) {
        return ['O id_opcao fornecido não existe na tabela pergunta_opcoes.'];
      }

      const questExiste = await this.repositorio.buscarQuestRespondidaPorId(idQuest);
      if (!questExiste) {
        return ['O id_quest fornecido não existe na tabela quest_respondidas.'];
      }

      // Verifica se a opção pertence à pergunta
      if (opcaoExiste.id_pergunta !== idPergunta) {
        return ['A opção selecionada não pertence à pergunta especificada.'];
      }

      return [];
    } catch (error) {
      return error.errors;
    }
  }
}